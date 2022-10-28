import * as redis from "redis";

const client = redis.createClient({
  url: "redis://127.0.0.1:6379",
});

client.on("connect", () => {
  console.log("Redis Connected");
  return client;
});
client.on("error", (err) => {
  console.log(err.message);
});

export default client;
