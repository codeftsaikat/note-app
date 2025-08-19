import rateLimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
  try {
    const userId = req.user?.id || req.ip;
    const { success } = await rateLimit.limit(userId);

    if (!success) {
      return res.status(429).json({
        massege: "Too many requests, please try again later.",
      });
    }

    next();
  } catch (error) {
    console.error("Rate limiter error:", error);
    return res.status(500).json({
      message: "Rate limit error",
    });
  }
};
export default rateLimiter;
