import { MongoClient, type Collection } from 'mongodb';

// Connection settings come from the environment (see .env.example).
const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || 'victor_portfolio';
const COLLECTION = 'subscribers';

interface Subscriber {
  email: string;
  timestamp: string;
  source: 'popup' | 'contact';
  createdAt: Date;
}

// Reuse one connection across hot reloads (dev) and warm serverless invocations (prod).
const globalForMongo = globalThis as unknown as {
  _mongoClientPromise?: Promise<MongoClient>;
  _subscriberIndexReady?: Promise<string>;
};

function getClient(): Promise<MongoClient> {
  if (!uri) {
    throw new Error(
      'MONGODB_URI is not set. Add your MongoDB Atlas connection string to .env.local (see .env.example).'
    );
  }
  if (!globalForMongo._mongoClientPromise) {
    globalForMongo._mongoClientPromise = new MongoClient(uri).connect();
  }
  return globalForMongo._mongoClientPromise;
}

async function getSubscribersCollection(): Promise<Collection<Subscriber>> {
  const client = await getClient();
  const collection = client.db(dbName).collection<Subscriber>(COLLECTION);

  // Create the unique email index once per process; it's a no-op if it already exists.
  if (!globalForMongo._subscriberIndexReady) {
    globalForMongo._subscriberIndexReady = collection
      .createIndex({ email: 1 }, { unique: true, name: 'email_unique' })
      .catch((error) => {
        globalForMongo._subscriberIndexReady = undefined; // retry on the next request
        throw error;
      });
  }
  await globalForMongo._subscriberIndexReady;

  return collection;
}

export async function saveEmailToDatabase(email: string, source: 'popup' | 'contact'): Promise<boolean> {
  try {
    const collection = await getSubscribersCollection();
    const normalized = email.trim().toLowerCase();

    // Upsert keyed on email: inserts new subscribers, leaves existing ones untouched.
    const result = await collection.updateOne(
      { email: normalized },
      {
        $setOnInsert: {
          email: normalized,
          timestamp: new Date().toISOString(),
          source,
          createdAt: new Date(),
        },
      },
      { upsert: true }
    );

    if (result.upsertedCount === 0) {
      console.log(`Email already exists: ${normalized}`);
      return false;
    }

    console.log(`✅ Email saved to database: ${normalized}`);
    return true;
  } catch (error) {
    console.error('Error saving email to database:', error);
    throw error;
  }
}

interface ContactMessage {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
  createdAt: Date;
}

/** Store the full contact message so nothing is lost if the notification email fails. */
export async function saveContactMessage(message: Omit<ContactMessage, 'createdAt'>) {
  const client = await getClient();
  await client
    .db(dbName)
    .collection<ContactMessage>('messages')
    .insertOne({ ...message, email: message.email.trim().toLowerCase(), createdAt: new Date() });
}

export async function getAllEmailsFromDatabase() {
  try {
    const collection = await getSubscribersCollection();
    const subscribers = await collection.find({}).sort({ createdAt: -1 }).toArray();

    return subscribers.map(sub => ({
      email: sub.email,
      timestamp: sub.timestamp,
      source: sub.source,
    }));
  } catch (error) {
    console.error('Error getting emails from database:', error);
    return [];
  }
}
