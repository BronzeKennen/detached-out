import Database from "better-sqlite3";
import bcrypt from 'bcryptjs'

const db = new Database('./database.db');


db.exec(`CREATE TABLE IF NOT EXISTS users (
    UserId INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    fname TEXT NOT NULL,
    lname TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    profile_pic_url TEXT,
    date_created DATETIME DEFAULT CURRENT_TIMESTAMP,
    date_of_birth DATETIME,
    biography TEXT,
    country_of_residence TEXT,
    state TEXT,
    current_company INTEGER,
    job_title INTEGER,
    university INTEGER,
    FOREIGN KEY (current_company) REFERENCES Companies(CompanyId),
    FOREIGN KEY (job_title) REFERENCES JobTitles(JobTitleId),
    FOREIGN KEY (university) REFERENCES Universities(UniversityId)
)`);


db.exec(`CREATE TABLE IF NOT EXISTS notifications (
    NotificationId INTEGER PRIMARY KEY AUTOINCREMENT,
    UserFrom INTEGER NOT NULL,
    UserTo INTEGER NOT NULL,
    type TEXT NOT NULL,
    DateCreated DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (UserFrom) REFERENCES users(UserId),
    FOREIGN KEY (UserTo) REFERENCES users(UserId)
    CHECK (UserFrom != UserTo)
)`);

db.exec(`CREATE TABLE IF NOT EXISTS Companies (
    CompanyId INTEGER PRIMARY KEY AUTOINCREMENT,
    company_name TEXT NOT NULL UNIQUE

)`);

db.exec(`CREATE TABLE IF NOT EXISTS Universities (
    UniversityId INTEGER PRIMARY KEY AUTOINCREMENT,
    university_name TEXT NOT NULL UNIQUE,
    major TEXT NOT NULL,
    StartDate TEXT NOT NULL,
    EndDate TEXT
)`);


db.exec(`CREATE TABLE IF NOT EXISTS JobTitles (
    JobTitleId INTEGER PRIMARY KEY AUTOINCREMENT,
    JobTitle TEXT NOT NULL UNIQUE 
)`);

db.exec(`CREATE TABLE IF NOT EXISTS work_experience (
    ExperienceId INTEGER PRIMARY KEY AUTOINCREMENT,
    UserId INTEGER NOT NULL,
    JobTitleId INTEGER NOT NULL,
    CompanyId INTEGER NOT NULL,
    StartDate TEXT NOT NULL,
    EndDate TEXT,
    Private BOOLEAN,
    FOREIGN KEY (UserId) REFERENCES users(UserId),
    FOREIGN KEY (JobTitleId) REFERENCES JobTitles(JobTitleId),
    FOREIGN KEY (CompanyId) REFERENCES Companies(CompanyId)   
)`);

db.exec(`CREATE TABLE IF NOT EXISTS comments (
    CommentId INTEGER PRIMARY KEY AUTOINCREMENT,
    PostId INTEGER NOT NULL,
    UserFrom INTEGER NOT NULL,
    Content TEXT NOT NULL,
    Reply INTEGER,
    FOREIGN KEY(Reply) REFERENCES comments(CommentId)
    FOREIGN KEY(PostId) REFERENCES posts(PostId),
    FOREIGN KEY(UserFrom) REFERENCES users(UserId)
)`);
// 
db.exec(`CREATE TABLE IF NOT EXISTS posts (
    PostId INTEGER PRIMARY KEY AUTOINCREMENT,
    UserId INTEGER NOT NULL,
    LikeCount INTEGER DEFAULT 0,
    RepostCount INTEGER DEFAULT 0,
    CommentCount INTEGER DEFAULT 0,
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    Content TEXT,
    ImagesJson TEXT,
    FOREIGN KEY(UserId) REFERENCES users(UserId)
)`);


db.exec(`CREATE TABLE IF NOT EXISTS friends (
    FriendId INTEGER PRIMARY KEY AUTOINCREMENT,
    Sender INTEGER NOT NULL,
    Recipient INTEGER NOT NULL,
    Status TEXT DEFAULT 'pending',
    DateCreated DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (Sender) REFERENCES users(UserId),
    FOREIGN KEY (Recipient) REFERENCES users(UserId),
    UNIQUE (Sender, Recipient)
)`);


//this is made to work for comments and posts
db.exec(`CREATE TABLE IF NOT EXISTS likes (
    LikeId INTEGER PRIMARY KEY AUTOINCREMENT,
    EntityType TEXT NOT NULL,
    EntityId INTEGER NOT NULL, 
    SenderId INTEGER NOT NULL,
    FOREIGN KEY (SenderId) REFERENCES users(UserId),
    UNIQUE (SenderId,EntityId,EntityType)
)`);

db.exec(`CREATE TABLE IF NOT EXISTS softskills (
    SkillId INTEGER PRIMARY KEY AUTOINCREMENT,
    SkillName TEXT NOT NULL UNIQUE
)`);


db.exec(`CREATE TABLE IF NOT EXISTS user_skills (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ObjectId INTEGER NOT NULL,    
    SkillId INTEGER NOT NULL,
    Type TEXT NOT NULL,
    FOREIGN KEY (SkillId) REFERENCES softskills(SkillId)
    UNIQUE (ObjectId,SkillId,Type)
)`);

db.exec(`CREATE TABLE IF NOT EXISTS job_adverts (
    AdvertId INTEGER PRIMARY KEY AUTOINCREMENT,
    DateCreated DATETIME DEFAULT CURRENT_TIMESTAMP,
    PosterId INTEGER NOT NULL,
    JobTitle TEXT NOT NULL,
    Location TEXT NOT NULL,
    EnrollmentType TEXT NOT NULL,
    WorkplaceType TEXT NOT NULL,
    JobDescription TEXT,
    MonthlyWage INTEGER,
    AdditionalInfo TEXT,
    FOREIGN KEY (PosterId) REFERENCES users(UserId)

);`)

db.exec(`CREATE TABLE IF NOT EXISTS chat_messages (
    SenderId INTEGER NOT NULL,
    RecipientId INTEGER NOT NULL,
    DateCreated DATETIME DEFAULT CURRENT_TIMESTAMP,
    Content TEXT NOT NULL,
    FOREIGN KEY (SenderId) REFERENCES users(UserId),
    FOREIGN KEY (RecipientId) REFERENCES users(UserId)
);`)

db.exec(`CREATE TABLE IF NOT EXISTS job_applications (
    ApplicationId INTEGER PRIMARY KEY AUTOINCREMENT,
    ApplicantId INTEGER NOT NULL,
    AdvertId INTEGER NOT NULL,
    DateCreated DATETIME DEFAULT CURRENT_TIMESTAMP,
    Message TEXT NOT NULL,
    FOREIGN KEY (ApplicantId) REFERENCES users(UserId),
    FOREIGN KEY (AdvertId) REFERENCES job_adverts(AdvertId) ON DELETE CASCADE,
    UNIQUE (ApplicantId,AdvertId)
)`)

db.exec(`CREATE TABLE IF NOT EXISTS impressions (
    ImpressionId INTEGER PRIMARY KEY AUTOINCREMENT,
    UserId INTEGER NOT NULL,
    PostId INTEGER NOT NULL,
    FOREIGN KEY (UserId) REFERENCES users(UserId),
    FOREIGN KEY (PostId) REFERENCES posts(PostId),
    UNIQUE (UserId,PostId)
)`)

db.exec(`INSERT OR IGNORE INTO softskills (SkillName) VALUES 
    ('Communication'),
    ('Leadership'),
    ('Teamwork'),
    ('Problem-solving'),
    ('Time management'),
    ('Adaptability'),
    ('Critical thinking'),
    ('Creativity'),
    ('Emotional intelligence'),
    ('Conflict resolution'),
    ('Active listening'),
    ('Negotiation'),
    ('Decision making'),
    ('Stress management'),
    ('Attention to detail'),
    ('Organization'),
    ('Initiative'),
    ('Flexibility'),
    ('Multitasking'),
    ('Reliability'),
    ('Responsibility'),
    ('Work ethic'),
    ('Patience'),
    ('Open-mindedness'),
    ('Persuasion'),
    ('Public speaking'),
    ('Networking'),
    ('Mentoring'),
    ('Coaching'),
    ('Collaboration'),
    ('Empathy'),
    ('Positive attitude'),
    ('Self-motivation'),
    ('Self-awareness'),
    ('Strategic thinking'),
    ('Analytical thinking'),
    ('Presentation skills'),
    ('Innovation'),
    ('Resourcefulness'),
    ('Accountability'),
    ('Dependability'),
    ('Integrity'),
    ('Diplomacy'),
    ('Tact'),
    ('Enthusiasm'),
    ('Proactiveness'),
    ('Detail-oriented'),
    ('Ability to learn quickly'),
    ('Goal-oriented'),
    ('Self-discipline'),
    ('Assertiveness'),
    ('Cultural awareness'),
    ('Conflict management'),
    ('Team building'),
    ('Customer service'),
    ('Listening skills'),
    ('Influencing'),
    ('Facilitation'),
    ('Self-confidence'),
    ('Trustworthiness'),
    ('Interpersonal skills'),
    ('Positive reinforcement'),
    ('Respectfulness'),
    ('Self-initiative'),
    ('Motivational skills'),
    ('Organizational skills'),
    ('Problem sensitivity'),
    ('Active collaboration'),
    ('Innovation mindset'),
    ('Leadership presence'),
    ('Learning agility'),
    ('Mediation'),
    ('Persuasiveness'),
    ('Professionalism'),
    ('Self-regulation'),
    ('Social skills'),
    ('Stress tolerance'),
    ('Team leadership'),
    ('Visionary thinking'),
    ('Workplace etiquette'),
    ('Critical analysis'),
    ('Emotional resilience'),
    ('Facilitation skills'),
    ('Initiative-taking'),
    ('Learning skills'),
    ('Motivating others'),
    ('Networking skills'),
    ('Positive mindset'),
    ('Resource management'),
    ('Conflict de-escalation'),
    ('Emotional stability'),
    ('Negotiation strategies'),
    ('Relationship building'),
    ('Responsiveness'),
    ('Situational awareness'),
    ('Team coordination'),
    ('Team facilitation'),
    ('Time prioritization'),
    ('Virtual collaboration'),
    ('Work-life balance')`);


export default db;