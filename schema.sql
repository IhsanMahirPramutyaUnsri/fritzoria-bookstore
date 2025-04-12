-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS fritzoria_bookstore;
USE fritzoria_bookstore;

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  name_en VARCHAR(100) NOT NULL,
  icon VARCHAR(50),
  featured BOOLEAN DEFAULT FALSE
);

-- Books table
CREATE TABLE IF NOT EXISTS books (
  id VARCHAR(50) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  publisher VARCHAR(255),
  publish_year INT,
  price DECIMAL(10, 2) NOT NULL,
  original_price DECIMAL(10, 2),
  cover_image VARCHAR(255),
  rating DECIMAL(3, 1) DEFAULT 0,
  review_count INT DEFAULT 0,
  stock INT DEFAULT 0,
  is_new BOOLEAN DEFAULT FALSE,
  is_bestseller BOOLEAN DEFAULT FALSE,
  language VARCHAR(50) DEFAULT 'Indonesia',
  page_count INT,
  dimensions VARCHAR(100),
  isbn VARCHAR(50),
  weight INT,
  synopsis TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Book categories (many-to-many relationship)
CREATE TABLE IF NOT EXISTS book_categories (
  book_id VARCHAR(50),
  category_id VARCHAR(50),
  PRIMARY KEY (book_id, category_id),
  FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

-- Reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id VARCHAR(50) PRIMARY KEY,
  book_id VARCHAR(50) NOT NULL,
  user_id VARCHAR(50) NOT NULL,
  user_name VARCHAR(100) NOT NULL,
  rating INT NOT NULL,
  comment TEXT,
  date DATE NOT NULL,
  FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE
);

-- Insert default categories
INSERT IGNORE INTO categories (id, name, name_en, icon, featured) VALUES
('all', 'Semua Kategori', 'All Categories', 'BookOpen', FALSE),
('manga', 'Manga', 'Manga', 'BookText', TRUE),
('light-novel', 'Light Novel', 'Light Novel', 'BookMarked', TRUE),
('fiction', 'Fiksi', 'Fiction', 'BookOpen', TRUE),
('non-fiction', 'Non-Fiksi', 'Non-Fiction', 'BookMarked', FALSE),
('education', 'Pendidikan', 'Education', 'GraduationCap', FALSE),
('romance', 'Romansa', 'Romance', 'Heart', TRUE),
('lifestyle', 'Gaya Hidup', 'Lifestyle', 'Coffee', FALSE),
('self-help', 'Pengembangan Diri', 'Self-Help', 'Lightbulb', FALSE),
('international', 'Internasional', 'International', 'Globe', FALSE),
('cooking', 'Memasak', 'Cooking', 'Utensils', FALSE),
('children', 'Anak-anak', 'Children', 'Baby', FALSE);
