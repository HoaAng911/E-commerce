import jwt from 'jsonwebtoken'


export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split("")[1]
  if (!token) {
    return res.status(401).json({ error: message })
  }
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(401).json({ error: 'token không hợp lệ' })
    }
    req.user = user
    next()
  })
}