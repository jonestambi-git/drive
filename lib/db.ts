import mongoose from "mongoose";

/* ── Module-level cache (survives hot-reload in dev) ── */
declare global {
  // eslint-disable-next-line no-var
  var _mongooseConn: typeof mongoose | null;
  // eslint-disable-next-line no-var
  var _mongoosePromise: Promise<typeof mongoose> | null;
}

if (!global._mongooseConn)    global._mongooseConn    = null;
if (!global._mongoosePromise) global._mongoosePromise = null;

export async function connectDB(): Promise<typeof mongoose> {
  /* Read URI at call-time, not module-load-time */
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error(
      "MONGODB_URI is not defined. Add it to .env.local and restart the server."
    );
  }

  /* Already connected */
  if (global._mongooseConn && mongoose.connection.readyState === 1) {
    return global._mongooseConn;
  }

  /* Reuse in-flight promise */
  if (!global._mongoosePromise) {
    global._mongoosePromise = mongoose
      .connect(uri, {
        bufferCommands:          false,
        serverSelectionTimeoutMS: 15000,
        socketTimeoutMS:          45000,
        maxPoolSize:              10,
      })
      .then((m) => {
        console.log("✅ MongoDB connected");
        return m;
      })
      .catch((err) => {
        /* Clear so next request retries */
        global._mongoosePromise = null;
        global._mongooseConn    = null;
        console.error("❌ MongoDB connection error:", err.message);
        throw err;
      });
  }

  global._mongooseConn = await global._mongoosePromise;
  return global._mongooseConn;
}
