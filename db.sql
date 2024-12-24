CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    username TEXT NOT NULL UNIQUE,
    created_at DATE DEFAULT CURRENT_DATE,
    updated_at DATE DEFAULT CURRENT_DATE,
    password TEXT NOT NULL
);

CREATE TABLE creatures (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    created_at DATE DEFAULT CURRENT_DATE,
    updated_at DATE DEFAULT CURRENT_DATE,
    description TEXT,
    image_url TEXT
);

CREATE TABLE challenges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    created_at DATE DEFAULT CURRENT_DATE,
    updated_at DATE DEFAULT CURRENT_DATE,
    type TEXT,
    details JSON
);

CREATE TABLE feed (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    title VARCHAR(255) NOT NULL,
    content JSON NOT NULL,
    feed_type VARCHAR(50) NOT NULL, -- Specifies the type of feed (e.g., "Holy Drip", "Daily Drops")
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at DATE DEFAULT CURRENT_DATE,
    CONSTRAINT fk_user
        FOREIGN KEY (user_id) 
        REFERENCES users (id) 
        ON DELETE CASCADE
);



-- Bridge Tables (Still need to add to our DB)
CREATE TABLE user_creature (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    creature_id UUID NOT NULL,
    created_at DATE DEFAULT CURRENT_DATE,
    updated_at DATE DEFAULT CURRENT_DATE,
    acquired_at DATE,
    level INT DEFAULT 1,
    max_resource INT DEFAULT 100,
    resources_collected INT DEFAULT 0,
    CONSTRAINT fk_user
        FOREIGN KEY (user_id) 
        REFERENCES users (id) 
        ON DELETE CASCADE,
    CONSTRAINT fk_creature
        FOREIGN KEY (creature_id) 
        REFERENCES creatures (id) 
        ON DELETE CASCADE
);

CREATE TABLE user_moods (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    mood TEXT NOT NULL,
    mood_date DATE DEFAULT CURRENT_DATE,
    created_at DATE DEFAULT CURRENT_DATE,
    updated_at DATE DEFAULT CURRENT_DATE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE user_analytics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    action_type TEXT NOT NULL,
    created_at DATE DEFAULT CURRENT_DATE,
    updated_at DATE DEFAULT CURRENT_DATE,
    action_timestamp DATE NOT NULL,
    duration INT,
    CONSTRAINT fk_user
        FOREIGN KEY (user_id) 
        REFERENCES users (id) 
        ON DELETE CASCADE
);

CREATE TABLE user_challenges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    created_at DATE DEFAULT CURRENT_DATE,
    updated_at DATE DEFAULT CURRENT_DATE,
    completed_at DATE,
    completed BOOLEAN DEFAULT FALSE,
    reward JSON,
    CONSTRAINT fk_user
        FOREIGN KEY (user_id) 
        REFERENCES users (id) 
        ON DELETE CASCADE
);

CREATE TABLE user_achievements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    icon VARCHAR(255),
    earned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at DATE DEFAULT CURRENT_DATE,
    updated_at DATE DEFAULT CURRENT_DATE,
    CONSTRAINT fk_user
        FOREIGN KEY (user_id) 
        REFERENCES users (id) 
        ON DELETE CASCADE
);

CREATE TABLE user_activity (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    action VARCHAR(100) NOT NULL, -- Type of activity (e.g., "Read Verse", "Trivia", "Achievement")
    details TEXT, -- Additional details about the activity
    points_earned INTEGER DEFAULT 0, -- Points earned from this activity, defaults to 0
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Timestamp when the activity occurred
    CONSTRAINT fk_user
        FOREIGN KEY (user_id) 
        REFERENCES users (id) 
        ON DELETE CASCADE
);

CREATE TABLE user_daily_stats (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    date DATE NOT NULL, -- Date for the stats
    time_spent INTEGER DEFAULT 0, -- Total time spent in minutes
    verses_read INTEGER DEFAULT 0, -- Total verses read that day
    trivia_played INTEGER DEFAULT 0, -- Number of trivia questions played
    reflections INTEGER DEFAULT 0,
    news_read INTEGER DEFAULT 0,
    achievements INTEGER DEFAULT 0, -- Number of achievements earned
    points INTEGER DEFAULT 0, -- Total points earned that day
    UNIQUE (user_id, date), -- Ensures one record per user per day
    CONSTRAINT fk_user
        FOREIGN KEY (user_id) 
        REFERENCES users (id) 
        ON DELETE CASCADE
);

CREATE TABLE user_weekly_stats (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    week_start DATE NOT NULL, -- Start of the week for the stats
    time_spent INTEGER DEFAULT 0, -- Total time spent in minutes
    verses_read INTEGER DEFAULT 0, -- Total verses read that week
    trivia_played INTEGER DEFAULT 0, -- Number of trivia questions played
    reflections INTEGER DEFAULT 0,
    news_read INTEGER DEFAULT 0,
    achievements INTEGER DEFAULT 0, -- Number of achievements earned
    points INTEGER DEFAULT 0, -- Total points earned that week
    UNIQUE (user_id, week_start), -- Ensures one record per user per week
    CONSTRAINT fk_user
        FOREIGN KEY (user_id) 
        REFERENCES users (id) 
        ON DELETE CASCADE
);

CREATE TABLE user_monthly_stats (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    month DATE NOT NULL, -- Month for the stats (e.g., "2024-07")
    time_spent INTEGER DEFAULT 0, -- Total time spent in minutes
    verses_read INTEGER DEFAULT 0, -- Total verses read that month
    trivia_played INTEGER DEFAULT 0, -- Number of trivia questions played
    reflections INTEGER DEFAULT 0,
    news_read INTEGER DEFAULT 0,
    achievements INTEGER DEFAULT 0, -- Number of achievements earned
    points INTEGER DEFAULT 0, -- Total points earned that month
    UNIQUE (user_id, month), -- Ensures one record per user per month
    CONSTRAINT fk_user
        FOREIGN KEY (user_id) 
        REFERENCES users (id) 
        ON DELETE CASCADE
);

CREATE TABLE user_yearly_stats (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    year VARCHAR(4) NOT NULL, -- Year for the stats (e.g., "2024")
    time_spent INTEGER DEFAULT 0, -- Total time spent in minutes
    verses_read INTEGER DEFAULT 0, -- Total verses read that year
    trivia_played INTEGER DEFAULT 0, -- Number of trivia questions played
    reflections INTEGER DEFAULT 0,
    news_read INTEGER DEFAULT 0,
    achievements INTEGER DEFAULT 0, -- Number of achievements earned
    points INTEGER DEFAULT 0, -- Total points earned that year
    UNIQUE (user_id, year), -- Ensures one record per user per year
    CONSTRAINT fk_user
        FOREIGN KEY (user_id) 
        REFERENCES users (id) 
        ON DELETE CASCADE
);
