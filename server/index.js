require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./database');

const authRoutes = require('./routes/authRoutes');
const movieRoutes = require('./routes/movieRoutes');
const userRoutes = require('./routes/userRoutes');
const watchlistRoutes = require('./routes/watchlistRoutes');
const ratingRoutes = require('./routes/ratingRoutes');
const searchRoutes = require('./routes/searchRoutes');
const passwordRoutes = require('./routes/passwordRoutes');
const settingRoutes = require('./routes/settingRoutes');
const heroCarouselRoutes = require('./routes/heroCarouselRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/users', userRoutes);
app.use('/api/watchlist', watchlistRoutes);
app.use('/api/ratings', ratingRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/password', passwordRoutes);
app.use('/api/settings', settingRoutes);
app.use('/api/hero', heroCarouselRoutes);
// Test route or home route (optional)
app.get('/', (req, res) => {
  res.send('Welcome to MovieApp Backend!');
});

// Sync database and start server
sequelize.sync({ alter: true }).then(() => {
  console.log('Database & tables synced');
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('Failed to sync DB:', err);
});
