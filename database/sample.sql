-- Sample data for Luxury Apartments Accra database
-- This file contains sample data to populate the database

USE luxury_apartments_accra;

-- Insert sample properties
INSERT INTO properties (title, description, location, address, price, bedrooms, bathrooms, area, type, available, featured, images, amenities) VALUES
(
  'Luxury 2-Bedroom Apartment',
  'Spacious and modern 2-bedroom apartment with stunning city views. Features high-end finishes, gourmet kitchen, and private balcony.',
  'East Legon, Accra',
  '123 Luxury Avenue, East Legon, Accra',
  2500.00,
  2,
  2,
  1200,
  'apartment',
  TRUE,
  TRUE,
  '["/uploads/property1-1.jpg", "/uploads/property1-2.jpg", "/uploads/property1-3.jpg"]',
  '["WiFi", "Air Conditioning", "Balcony", "Gym Access", "Pool", "Security", "Parking"]'
),
(
  'Premium 3-Bedroom Penthouse',
  'Exclusive penthouse with panoramic views of Accra. Features luxury amenities, private terrace, and 24/7 concierge service.',
  'Airport Residential Area, Accra',
  '456 Premium Heights, Airport Residential Area, Accra',
  4500.00,
  3,
  3,
  1800,
  'penthouse',
  TRUE,
  TRUE,
  '["/uploads/property2-1.jpg", "/uploads/property2-2.jpg", "/uploads/property2-3.jpg"]',
  '["WiFi", "Air Conditioning", "Private Terrace", "Gym Access", "Pool", "Security", "Parking", "Concierge", "Elevator"]'
),
(
  'Modern 1-Bedroom Studio',
  'Contemporary studio apartment perfect for professionals. Features modern design, smart home technology, and convenient location.',
  'Osu, Accra',
  '789 Modern Street, Osu, Accra',
  1500.00,
  1,
  1,
  800,
  'studio',
  TRUE,
  FALSE,
  '["/uploads/property3-1.jpg", "/uploads/property3-2.jpg"]',
  '["WiFi", "Air Conditioning", "Smart Home", "Security", "Parking"]'
),
(
  'Family 4-Bedroom Villa',
  'Spacious family villa with garden and pool. Perfect for families seeking luxury and space in a secure environment.',
  'Trasacco Valley, Accra',
  '321 Family Villa Road, Trasacco Valley, Accra',
  6000.00,
  4,
  4,
  2500,
  'apartment',
  FALSE,
  TRUE,
  '["/uploads/property4-1.jpg", "/uploads/property4-2.jpg", "/uploads/property4-3.jpg"]',
  '["WiFi", "Air Conditioning", "Garden", "Pool", "Security", "Parking", "Playground", "BBQ Area"]'
),
(
  'Executive 2-Bedroom Apartment',
  'Executive apartment in the heart of Accra''s business district. Features premium finishes and business amenities.',
  'Ridge, Accra',
  '654 Executive Plaza, Ridge, Accra',
  3000.00,
  2,
  2,
  1400,
  'apartment',
  FALSE,
  FALSE,
  '["/uploads/property5-1.jpg", "/uploads/property5-2.jpg"]',
  '["WiFi", "Air Conditioning", "Business Center", "Gym Access", "Security", "Parking", "Conference Room"]'
);

-- Insert sample admin user (password: admin123)
INSERT INTO users (username, email, password_hash, role) VALUES
('admin', 'admin@westburyhomes.com', '$2a$10$CwTycUXWue0Thq9StjUM0uJ8iF1rQb6pF6Qb6pF6Qb6pF6Qb6pF6Qb', 'admin'),
('superadmin', 'superadmin@westburyhomes.com', '$2a$10$CwTycUXWue0Thq9StjUM0uJ8iF1rQb6pF6Qb6pF6Qb6pF6Qb6pF6Qb', 'superadmin');

-- Insert sample staff members
INSERT INTO staff (name, position, email, phone, department, hire_date, salary, status) VALUES
('John Doe', 'Property Manager', 'john.doe@luxuryapartmentsaccra.com', '+233 20 123 4567', 'Management', '2023-01-10', 3500.00, 'active'),
('Sarah Johnson', 'Maintenance Supervisor', 'sarah.johnson@luxuryapartmentsaccra.com', '+233 24 987 6543', 'Maintenance', '2022-05-15', 2800.00, 'active'),
('Michael Chen', 'Security Officer', 'michael.chen@luxuryapartmentsaccra.com', '+233 26 555 1234', 'Security', '2021-09-01', 2200.00, 'active'),
('Lisa Brown', 'Housekeeping Manager', 'lisa.brown@luxuryapartmentsaccra.com', '+233 27 777 8888', 'Housekeeping', '2023-03-20', 2500.00, 'active');

-- Insert sample inventory items
INSERT INTO inventory (name, category, quantity, min_quantity, unit) VALUES
('Cleaning Supplies', 'Housekeeping', 50, 10, 'units'),
('Towels', 'Linen', 100, 20, 'pieces'),
('Bed Sheets', 'Linen', 80, 15, 'sets'),
('Toilet Paper', 'Bathroom', 200, 30, 'rolls'),
('Soap', 'Bathroom', 150, 25, 'bars'),
('Light Bulbs', 'Maintenance', 75, 10, 'pieces'),
('Air Fresheners', 'Housekeeping', 60, 15, 'units');

-- Insert sample contact inquiries
INSERT INTO contact_inquiries (name, email, phone, subject, message, property_id, status) VALUES
('Alice Smith', 'alice.smith@email.com', '+233 20 111 2222', 'Availability Inquiry', 'I am interested in the 2-bedroom apartment. Can you provide more information about availability?', 1, 'new'),
('Bob Wilson', 'bob.wilson@email.com', '+233 24 333 4444', 'Rental Terms', 'Looking for a long-term rental. What are the terms for the penthouse?', 2, 'new'),
('Carol Davis', 'carol.davis@email.com', '+233 26 555 6666', 'Short-term Stay', 'Is the studio apartment available for short-term stays?', 3, 'new');

-- Insert sample bookings
INSERT INTO bookings (property_id, guest_name, guest_email, guest_phone, check_in_date, check_out_date, guests_count, total_amount, special_requests, status) VALUES
(1, 'David Miller', 'david.miller@email.com', '+233 20 777 8888', '2024-02-15', '2024-02-20', 2, 12500.00, 'Early check-in if possible', 'confirmed'),
(2, 'Emma Thompson', 'emma.thompson@email.com', '+233 24 999 0000', '2024-02-25', '2024-03-05', 3, 45000.00, 'Late check-out on departure day', 'pending'),
(4, 'Frank Anderson', 'frank.anderson@email.com', '+233 26 111 2222', '2024-03-10', '2024-03-15', 4, 30000.00, 'Extra cleaning supplies needed', 'confirmed');

-- Insert sample attendance records
INSERT INTO attendance (staff_id, date, time_in, time_out, status) VALUES
(1, CURDATE(), '08:00:00', '17:00:00', 'present'),
(2, CURDATE(), '07:30:00', '16:30:00', 'present'),
(3, CURDATE(), '06:00:00', '18:00:00', 'present'),
(4, CURDATE(), '09:00:00', '18:00:00', 'present');