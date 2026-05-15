
INSERT INTO admin_users (email, password_hash, name) 
VALUES ('admin@prithvi.app', '$2b$10$tZ2z/r8S.O8fA2uW4vX02OPa3qZ3mXv8w2.0C9C8Xo9n8/jX/gQ7q', 'Admin User'); -- Password is Admin1234

INSERT INTO species (name, scientific_name, climate_zone, description, image_url) VALUES 
('Tomato', 'Solanum lycopersicum', 'All', 'A versatile and easy to grow vegetable.', 'https://placehold.co/400x300/1B4332/F5F0E8?text=Tomato'),
('Chilli', 'Capsicum frutescens', 'All', 'Spicy green chillies perfect for everyday cooking.', 'https://placehold.co/400x300/1B4332/F5F0E8?text=Chilli'),
('Spinach', 'Spinacia oleracea', 'Winter', 'Nutrient-rich leafy greens that grow quickly.', 'https://placehold.co/400x300/1B4332/F5F0E8?text=Spinach'),
('Coriander', 'Coriandrum sativum', 'All', 'Essential herb for flavouring dishes.', 'https://placehold.co/400x300/1B4332/F5F0E8?text=Coriander'),
('Bottle Gourd', 'Lagenaria siceraria', 'Summer/Monsoon', 'A creeping vine that produces large edible gourds.', 'https://placehold.co/400x300/1B4332/F5F0E8?text=Bottle+Gourd');

INSERT INTO care_schedules (species_id, season, day_offset, action_type, message_title, message_body) VALUES
(1, 'dry-winter', 0, 'water', 'Initial Watering', 'Water the seeds lightly after sowing.'),
(1, 'dry-winter', 7, 'germination', 'Sprouting Time', 'Your tomatoes should start sprouting soon!'),
(1, 'dry-winter', 14, 'water', 'Regular Watering', 'Keep the soil moist but not waterlogged.'),
(1, 'dry-winter', 21, 'weed', 'Weed Check', 'Remove any weeds competing with your plant.'),
(1, 'dry-winter', 30, 'fertilise', 'Feed Your Plant', 'Apply organic compost or fertiliser.'),
(1, 'dry-winter', 60, 'harvest', 'Harvest Time', 'Your tomatoes are ready to be picked!'),

(2, 'pre-monsoon', 0, 'water', 'Sowing Chillies', 'Give your chilli seeds a good initial watering.'),
(2, 'pre-monsoon', 10, 'germination', 'Germination', 'Look out for tiny chilli shoots.'),
(2, 'pre-monsoon', 20, 'water', 'Water Needs', 'Water deeply once a week.'),
(2, 'pre-monsoon', 30, 'fertilise', 'Boost Growth', 'Add some nitrogen-rich fertiliser.'),
(2, 'pre-monsoon', 45, 'weed', 'Clear Space', 'Ensure no weeds are blocking sunlight.'),
(2, 'pre-monsoon', 70, 'harvest', 'Pick Chillies', 'Pluck the green chillies to encourage more growth.'),

(3, 'dry-winter', 0, 'water', 'Moist Soil', 'Spinach needs consistently moist soil.'),
(3, 'dry-winter', 5, 'germination', 'Fast Sprout', 'Spinach sprouts quickly!'),
(3, 'dry-winter', 10, 'water', 'Keep Moist', 'Don''t let the soil dry out.'),
(3, 'dry-winter', 15, 'fertilise', 'Liquid Feed', 'A light liquid fertiliser will help.'),
(3, 'dry-winter', 20, 'weed', 'Weeding', 'Keep the bed clear.'),
(3, 'dry-winter', 40, 'harvest', 'Leaf Harvest', 'Cut outer leaves or harvest the whole plant.'),

(4, 'post-monsoon', 0, 'water', 'Sowing Coriander', 'Water gently so seeds don''t wash away.'),
(4, 'post-monsoon', 7, 'germination', 'Seedlings', 'Coriander seedlings should appear.'),
(4, 'post-monsoon', 14, 'water', 'Watering', 'Water when the top inch feels dry.'),
(4, 'post-monsoon', 21, 'weed', 'Weed Control', 'Remove small weeds by hand.'),
(4, 'post-monsoon', 28, 'fertilise', 'Light Feed', 'A mild compost tea works well.'),
(4, 'post-monsoon', 35, 'harvest', 'Cut Leaves', 'Harvest leaves as needed for cooking.'),

(5, 'monsoon', 0, 'water', 'Planting Gourd', 'Plant in mounds and water well.'),
(5, 'monsoon', 8, 'germination', 'Sprouting', 'The seeds should have sprouted by now.'),
(5, 'monsoon', 20, 'water', 'Deep Watering', 'Water deeply at the base of the plant.'),
(5, 'monsoon', 30, 'fertilise', 'Heavy Feeder', 'Apply rich compost or manure.'),
(5, 'monsoon', 40, 'weed', 'Vine Maintenance', 'Keep the area around the base weed-free.'),
(5, 'monsoon', 80, 'harvest', 'Gourd Harvest', 'Harvest when gourds are firm and light green.');
