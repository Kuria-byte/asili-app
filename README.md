# Asili - Technical Documentation

<p align="center">
  <img src="./assets/logo/asili-logo-full.png" alt="Asili Logo" width="320"/>
</p>

<p align="center">
  <strong>Preserving Kenyan Heritage Through Language Learning</strong>
</p>

<p align="center">
  <a href="#project-overview">Project Overview</a> •
  <a href="#architecture">Architecture</a> •
  <a href="#database-schema">Database Schema</a> •
  <a href="#api-documentation">API Documentation</a> •
  <a href="#frontend-implementation">Frontend Implementation</a> •
  <a href="#backend-implementation">Backend Implementation</a> •
  <a href="#ai-components">AI Components</a> •
  <a href="#development-setup">Development Setup</a> •
  <a href="#deployment">Deployment</a> •
  <a href="#contributing">Contributing</a> •
  <a href="#acknowledgments">Acknowledgments</a>
</p>

---

## Project Overview

Asili is a comprehensive language learning platform dedicated to preserving and teaching Kenya's rich vernacular languages. With a focus on cultural authenticity and educational engagement, Asili provides an immersive learning experience that connects users with Kenya's diverse linguistic heritage.

### Mission

To revitalize and preserve Kenya's linguistic diversity through accessible, engaging education that strengthens cultural identity and national heritage.

### Vision

A Kenya where vernacular languages thrive across generations, connecting people with their cultural roots and preserving linguistic diversity.

## Architecture

### System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Client Applications                       │
│                                                                 │
│  ┌───────────────┐    ┌───────────────┐    ┌───────────────┐    │
│  │  Mobile App   │    │    Web App    │    │ Offline Mode  │    │
│  │  (React Native)│    │   (React.js)  │    │               │    │
│  └───────┬───────┘    └───────┬───────┘    └───────┬───────┘    │
└──────────┼─────────────────────┼─────────────────────┼──────────┘
           │                     │                     │
┌──────────┼─────────────────────┼─────────────────────┼──────────┐
│          │        API Gateway & Authentication       │          │
│          └─────────────────────┬─────────────────────┘          │
│                                │                                │
│  ┌─────────────────┐      ┌────┴─────┐      ┌─────────────────┐ │
│  │  User Service   │◄────►│   Core   │◄────►│ Content Service │ │
│  └─────────────────┘      │ Services │      └─────────────────┘ │
│  ┌─────────────────┐      └────┬─────┘      ┌─────────────────┐ │
│  │ Learning Service│◄────────►│            │ Analytics Service│ │
│  └─────────────────┘           └──────────►└─────────────────┘ │
│                                                                │
└────────────────────────────┬───────────────────────────────────┘
                             │
┌────────────────────────────┼───────────────────────────────────┐
│                            │                                   │
│  ┌─────────────────┐   ┌───┴────────────┐   ┌───────────────┐  │
│  │    Database     │   │  File Storage  │   │  AI Services  │  │
│  │   (PostgreSQL)  │   │  (Object Store)│   │               │  │
│  └─────────────────┘   └────────────────┘   └───────────────┘  │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

### Microservices Architecture

Asili follows a domain-driven design with bounded contexts implemented as microservices:

1. **Authentication Service**
   - User registration and authentication
   - JWT token management
   - Role-based access control
   - OAuth integration for social login

2. **User Service**
   - Profile management
   - User preferences
   - Learning progress tracking
   - Social connections

3. **Content Service**
   - Language content management
   - Media storage (audio, images)
   - Cultural context
   - Curriculum structure

4. **Learning Service**
   - Exercise generation
   - Progress evaluation
   - Spaced repetition algorithms
   - Personalized learning paths

5. **Analytics Service**
   - User behavior tracking
   - Learning effectiveness metrics
   - Content performance analytics
   - Recommendation engine

6. **Community Service**
   - Language exchange facilitation
   - Event management
   - Community roles and contributions
   - Forum and discussion management

### Technical Stack Overview

- **Frontend**: 
  - Web: React.js, Next.js, Redux, TypeScript
  - Mobile: React Native, MobX, TypeScript
  
- **Backend**:
  - API: Node.js, NestJS, TypeScript
  - Database: PostgreSQL, Redis
  - Search: Elasticsearch
  - Message Queue: RabbitMQ
  
- **DevOps**:
  - Containerization: Docker, Kubernetes
  - CI/CD: GitHub Actions, Jenkins
  - Infrastructure as Code: Terraform
  - Monitoring: Prometheus, Grafana

## Database Schema

### Entity Relationship Diagram

```
┌────────────────┐     ┌────────────────┐     ┌────────────────┐
│     Users      │     │   Languages    │     │    Courses     │
├────────────────┤     ├────────────────┤     ├────────────────┤
│ id             │     │ id             │     │ id             │
│ email          │     │ code           │     │ language_id    │
│ password_hash  │     │ name           │     │ name           │
│ full_name      │     │ region         │     │ description    │
│ region         │     │ description    │     │ level          │
│ role           │     │ family         │     │ is_curriculum  │
│ created_at     │     │ speakers_count │     │ curriculum_grade│
└───────┬────────┘     │ active         │     │ icon_url       │
        │              └───────┬────────┘     └───────┬────────┘
        │                      │                      │
        │                      │                      │
┌───────┴────────┐     ┌──────┴───────┐       ┌──────┴───────┐
│UserProgress     │     │Lessons       │       │Exercises     │
├────────────────┤     ├──────────────┤       ├──────────────┤
│id              │     │id            │       │id            │
│user_id         │     │course_id     │       │lesson_id     │
│lesson_id       │     │title         │       │type          │
│status          │     │description   │       │instruction   │
│score           │     │order_index   │       │difficulty    │
│completion_date │     │duration_min  │       │content       │
│xp_earned       │     │xp_reward     │       │answers       │
│attempts        │     │is_published  │       │correct_answer│
└───────┬────────┘     └───────┬──────┘       └──────────────┘
        │                      │
        │                      │
┌───────┴────────┐     ┌──────┴───────┐       ┌──────────────┐
│UserVocabulary   │     │LessonContent │       │Cultural      │
├────────────────┤     ├──────────────┤       │Context       │
│id              │     │id            │       ├──────────────┤
│user_id         │     │lesson_id     │       │id            │
│vocabulary_id   │     │content_type  │       │language_id   │
│proficiency     │     │title         │       │title         │
│last_reviewed   │     │text_content  │       │description   │
│next_review     │     │audio_url     │       │type          │
│review_count    │     │image_url     │       │content       │
└────────────────┘     │order_index   │       │media_urls    │
                       └──────────────┘       │region        │
                                              └──────────────┘
```

### Detailed Schema Definition

#### Users Table

```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(15),
    preferred_language UUID REFERENCES languages(id),
    date_of_birth DATE,
    region VARCHAR(100),
    bio TEXT,
    profile_image_url VARCHAR(255),
    role VARCHAR(20) NOT NULL DEFAULT 'student',
    is_verified BOOLEAN DEFAULT FALSE,
    verification_token VARCHAR(255),
    password_reset_token VARCHAR(255),
    password_reset_expires TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    last_login TIMESTAMP,
    login_count INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
```

#### Languages Table

```sql
CREATE TABLE languages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(10) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    english_name VARCHAR(100) NOT NULL,
    region VARCHAR(100) NOT NULL,
    language_family VARCHAR(50),
    description TEXT,
    introduction_text TEXT,
    intro_video_url VARCHAR(255),
    icon_url VARCHAR(255),
    banner_url VARCHAR(255),
    speakers_count INTEGER,
    dialect_of UUID REFERENCES languages(id),
    is_active BOOLEAN DEFAULT TRUE,
    difficulty_level VARCHAR(20),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    created_by UUID REFERENCES users(id),
    last_updated_by UUID REFERENCES users(id)
);

CREATE INDEX idx_languages_code ON languages(code);
CREATE INDEX idx_languages_region ON languages(region);
```

#### Courses Table

```sql
CREATE TABLE courses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    language_id UUID NOT NULL REFERENCES languages(id),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    level VARCHAR(20) NOT NULL,
    is_curriculum_aligned BOOLEAN DEFAULT FALSE,
    curriculum_grade VARCHAR(50),
    estimated_hours INTEGER,
    icon_url VARCHAR(255),
    banner_url VARCHAR(255),
    prerequisite_course_id UUID REFERENCES courses(id),
    is_published BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    created_by UUID REFERENCES users(id),
    last_updated_by UUID REFERENCES users(id)
);

CREATE INDEX idx_courses_language_id ON courses(language_id);
CREATE INDEX idx_courses_level ON courses(level);
```

#### Lessons Table

```sql
CREATE TABLE lessons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID NOT NULL REFERENCES courses(id),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    order_index INTEGER NOT NULL,
    estimated_duration_minutes INTEGER,
    xp_reward INTEGER NOT NULL DEFAULT 10,
    is_published BOOLEAN DEFAULT FALSE,
    prerequisite_lesson_id UUID REFERENCES lessons(id),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    created_by UUID REFERENCES users(id),
    last_updated_by UUID REFERENCES users(id)
);

CREATE INDEX idx_lessons_course_id ON lessons(course_id);
CREATE INDEX idx_lessons_order ON lessons(course_id, order_index);
```

#### Exercises Table

```sql
CREATE TABLE exercises (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lesson_id UUID NOT NULL REFERENCES lessons(id),
    exercise_type VARCHAR(50) NOT NULL,
    instruction TEXT NOT NULL,
    content JSONB NOT NULL,
    difficulty VARCHAR(20) NOT NULL,
    points INTEGER NOT NULL DEFAULT 10,
    order_index INTEGER NOT NULL,
    answers JSONB,
    correct_answer JSONB,
    hint TEXT,
    feedback_correct TEXT,
    feedback_incorrect TEXT,
    is_published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    created_by UUID REFERENCES users(id),
    last_updated_by UUID REFERENCES users(id)
);

CREATE INDEX idx_exercises_lesson_id ON exercises(lesson_id);
CREATE INDEX idx_exercises_type ON exercises(exercise_type);
```

#### User Progress Table

```sql
CREATE TABLE user_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id),
    lesson_id UUID NOT NULL REFERENCES lessons(id),
    status VARCHAR(20) NOT NULL DEFAULT 'not_started',
    score INTEGER,
    completion_date TIMESTAMP,
    xp_earned INTEGER,
    time_spent_seconds INTEGER,
    attempts INTEGER DEFAULT 0,
    streak_maintained BOOLEAN,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    UNIQUE(user_id, lesson_id)
);

CREATE INDEX idx_user_progress_user ON user_progress(user_id);
CREATE INDEX idx_user_progress_lesson ON user_progress(lesson_id);
CREATE INDEX idx_user_progress_status ON user_progress(status);
```

#### Vocabulary Table

```sql
CREATE TABLE vocabulary (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    language_id UUID NOT NULL REFERENCES languages(id),
    word VARCHAR(255) NOT NULL,
    part_of_speech VARCHAR(50),
    translation_en TEXT NOT NULL,
    translation_sw TEXT,
    example_sentence TEXT,
    example_translation_en TEXT,
    audio_url VARCHAR(255),
    image_url VARCHAR(255),
    difficulty_level VARCHAR(20),
    cultural_context TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    created_by UUID REFERENCES users(id),
    verified_by UUID REFERENCES users(id),
    is_verified BOOLEAN DEFAULT FALSE
);

CREATE INDEX idx_vocabulary_language ON vocabulary(language_id);
CREATE INDEX idx_vocabulary_word ON vocabulary(word, language_id);
```

#### Cultural Context Table

```sql
CREATE TABLE cultural_context (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    language_id UUID NOT NULL REFERENCES languages(id),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    type VARCHAR(50) NOT NULL,
    content_html TEXT,
    media_urls JSONB,
    region VARCHAR(100),
    tags TEXT[],
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    created_by UUID REFERENCES users(id),
    verified_by UUID REFERENCES users(id),
    is_verified BOOLEAN DEFAULT FALSE
);

CREATE INDEX idx_cultural_context_language ON cultural_context(language_id);
CREATE INDEX idx_cultural_context_type ON cultural_context(type);
```

#### Communities Table

```sql
CREATE TABLE communities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    language_id UUID REFERENCES languages(id),
    region VARCHAR(100),
    type VARCHAR(50) NOT NULL,
    image_url VARCHAR(255),
    banner_url VARCHAR(255),
    member_count INTEGER DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    created_by UUID REFERENCES users(id)
);

CREATE INDEX idx_communities_language ON communities(language_id);
CREATE INDEX idx_communities_type ON communities(type);
```

## API Documentation

Asili API follows RESTful principles with these key features:
- JWT-based authentication
- Rate limiting
- Versioned endpoints
- Comprehensive error handling

### Authentication Endpoints

```
POST /api/v1/auth/register
POST /api/v1/auth/login
POST /api/v1/auth/refresh-token
POST /api/v1/auth/forgot-password
POST /api/v1/auth/reset-password
POST /api/v1/auth/verify-email
GET /api/v1/auth/me
```

#### Example: User Registration

**Request:**
```
POST /api/v1/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePassword123!",
  "full_name": "John Doe",
  "preferred_language": "en",
  "region": "Nairobi"
}
```

**Response:**
```
Status: 201 Created
Content-Type: application/json

{
  "id": "a1b2c3d4-e5f6-7890-abcd-1234567890ab",
  "email": "user@example.com",
  "full_name": "John Doe",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "def1234567890...",
  "message": "Registration successful. Please verify your email."
}
```

### Language Learning Endpoints

```
GET /api/v1/languages
GET /api/v1/languages/{id}
GET /api/v1/languages/{id}/courses
GET /api/v1/courses/{id}
GET /api/v1/courses/{id}/lessons
GET /api/v1/lessons/{id}
GET /api/v1/lessons/{id}/exercises
POST /api/v1/exercises/{id}/submit
GET /api/v1/progress
GET /api/v1/statistics
```

#### Example: Get Exercises for a Lesson

**Request:**
```
GET /api/v1/lessons/a1b2c3d4-e5f6-7890-abcd-1234567890ab/exercises
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response:**
```
Status: 200 OK
Content-Type: application/json

{
  "exercises": [
    {
      "id": "f1e2d3c4-b5a6-7890-abcd-1234567890ab",
      "type": "multiple_choice",
      "instruction": "Select the correct translation for 'hello'",
      "content": {
        "question": "What is 'hello' in Kikuyu?",
        "options": ["Ūhoro", "Wĩrĩrĩ", "Nĩndakwenda", "Kuoga"]
      },
      "difficulty": "easy",
      "points": 10,
      "order_index": 1
    },
    {
      "id": "b1a2c3d4-e5f6-7890-abcd-1234567890cd",
      "type": "fill_blank",
      "instruction": "Fill in the missing word",
      "content": {
        "sentence": "_____ waku, nĩ mwega?",
        "word_bank": ["Ūhoro", "Wĩrĩrĩ", "Nĩ", "Mwega"]
      },
      "difficulty": "medium",
      "points": 15,
      "order_index": 2
    }
  ],
  "total": 2,
  "lesson_id": "a1b2c3d4-e5f6-7890-abcd-1234567890ab"
}
```

### Community Endpoints

```
GET /api/v1/communities
GET /api/v1/communities/{id}
POST /api/v1/communities
GET /api/v1/communities/{id}/members
POST /api/v1/communities/{id}/join
GET /api/v1/language-partners
POST /api/v1/language-partners/match
GET /api/v1/events
POST /api/v1/events
```

### Content Management Endpoints

```
GET /api/v1/admin/languages
POST /api/v1/admin/languages
PUT /api/v1/admin/languages/{id}
GET /api/v1/admin/courses
POST /api/v1/admin/courses
PUT /api/v1/admin/courses/{id}
GET /api/v1/admin/lessons
POST /api/v1/admin/lessons
PUT /api/v1/admin/lessons/{id}
GET /api/v1/admin/exercises
POST /api/v1/admin/exercises
PUT /api/v1/admin/exercises/{id}
```

### API Response Format

All API responses follow a standard format:

```json
{
  "status": "success|error",
  "data": { ... },
  "message": "Human-readable message",
  "meta": {
    "pagination": {
      "total": 100,
      "per_page": 20,
      "current_page": 1,
      "last_page": 5,
      "from": 1,
      "to": 20
    }
  }
}
```

## Frontend Implementation

### Project Structure

```
/src
├── assets/                  # Static assets (images, fonts, etc.)
├── components/              # Reusable React components
│   ├── common/              # Generic UI components
│   ├── auth/                # Authentication-related components
│   ├── learning/            # Learning experience components
│   └── community/           # Community and social components
├── context/                 # React context providers
├── hooks/                   # Custom React hooks
├── layouts/                 # Page layout components
├── lib/                     # Utility functions and libraries
├── pages/                   # Page components (Next.js)
├── services/                # API service modules
├── store/                   # Redux state management
│   ├── slices/              # Redux toolkit slices
│   ├── actions/             # Action creators
│   ├── middleware/          # Redux middleware
│   └── store.ts             # Redux store configuration
├── styles/                  # Global styles and theme
├── types/                   # TypeScript type definitions
└── utils/                   # Utility functions
```

### SOLID Principles Implementation

#### 1. Single Responsibility Principle

Each component and service has a single responsibility:

```tsx
// UserProfileService.ts - Handles only user profile operations
export class UserProfileService {
  private apiClient: ApiClient;
  
  constructor(apiClient: ApiClient) {
    this.apiClient = apiClient;
  }
  
  async getUserProfile(userId: string): Promise<UserProfile> {
    return this.apiClient.get(`/users/${userId}/profile`);
  }
  
  async updateUserProfile(userId: string, data: UserProfileUpdateDTO): Promise<UserProfile> {
    return this.apiClient.put(`/users/${userId}/profile`, data);
  }
}

// LearningProgressService.ts - Handles only learning progress operations
export class LearningProgressService {
  private apiClient: ApiClient;
  
  constructor(apiClient: ApiClient) {
    this.apiClient = apiClient;
  }
  
  async getUserProgress(userId: string): Promise<UserProgress[]> {
    return this.apiClient.get(`/users/${userId}/progress`);
  }
  
  async submitLessonCompletion(userId: string, lessonId: string, data: LessonCompletionDTO): Promise<void> {
    return this.apiClient.post(`/users/${userId}/lessons/${lessonId}/complete`, data);
  }
}
```

#### 2. Open/Closed Principle

Components are designed to be extended without modification:

```tsx
// Base ExerciseComponent that can be extended
interface ExerciseProps {
  exercise: Exercise;
  onSubmit: (answer: any) => void;
  onHintRequest?: () => void;
}

// Base component
const BaseExerciseComponent: React.FC<ExerciseProps> = ({ 
  exercise, 
  onSubmit,
  onHintRequest 
}) => {
  // Common exercise UI and logic
  return (
    <div className="exercise-container">
      <h3>{exercise.instruction}</h3>
      {/* Common UI elements */}
      {onHintRequest && (
        <button onClick={onHintRequest} className="hint-button">
          Get Hint
        </button>
      )}
    </div>
  );
};

// Extended for specific exercise types
const MultipleChoiceExercise: React.FC<ExerciseProps> = (props) => {
  const { exercise, onSubmit } = props;
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  
  return (
    <BaseExerciseComponent {...props}>
      <div className="options-container">
        {exercise.content.options.map((option) => (
          <button 
            key={option} 
            onClick={() => setSelectedOption(option)}
            className={selectedOption === option ? 'selected' : ''}
          >
            {option}
          </button>
        ))}
      </div>
      <button 
        onClick={() => selectedOption && onSubmit(selectedOption)}
        disabled={!selectedOption}
      >
        Submit
      </button>
    </BaseExerciseComponent>
  );
};
```

#### 3. Liskov Substitution Principle

Child components can replace parent components without affecting functionality:

```tsx
// Abstract base class for authentication strategies
abstract class AuthStrategy {
  abstract login(credentials: LoginCredentials): Promise<AuthResponse>;
  abstract register(userData: RegisterData): Promise<AuthResponse>;
  abstract refreshToken(token: string): Promise<string>;
  abstract logout(): Promise<void>;
}

// Email/password authentication
class EmailPasswordAuth extends AuthStrategy {
  private apiClient: ApiClient;
  
  constructor(apiClient: ApiClient) {
    super();
    this.apiClient = apiClient;
  }
  
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    return this.apiClient.post('/auth/login', credentials);
  }
  
  async register(userData: RegisterData): Promise<AuthResponse> {
    return this.apiClient.post('/auth/register', userData);
  }
  
  async refreshToken(token: string): Promise<string> {
    const response = await this.apiClient.post('/auth/refresh-token', { token });
    return response.token;
  }
  
  async logout(): Promise<void> {
    await this.apiClient.post('/auth/logout');
  }
}

// OAuth authentication
class OAuthAuthentication extends AuthStrategy {
  private apiClient: ApiClient;
  private provider: string;
  
  constructor(apiClient: ApiClient, provider: 'google' | 'facebook' | 'apple') {
    super();
    this.apiClient = apiClient;
    this.provider = provider;
  }
  
  async login(credentials: OAuthCredentials): Promise<AuthResponse> {
    return this.apiClient.post(`/auth/${this.provider}/login`, credentials);
  }
  
  async register(userData: never): Promise<AuthResponse> {
    // OAuth doesn't need separate registration
    throw new Error("Registration not needed for OAuth");
  }
  
  async refreshToken(token: string): Promise<string> {
    const response = await this.apiClient.post(`/auth/${this.provider}/refresh-token`, { token });
    return response.token;
  }
  
  async logout(): Promise<void> {
    await this.apiClient.post(`/auth/${this.provider}/logout`);
  }
}

// Auth context can use any auth strategy
const AuthContext = createContext<{
  auth: AuthStrategy;
  user: User | null;
  isAuthenticated: boolean;
} | undefined>(undefined);
```

#### 4. Interface Segregation Principle

Interfaces are client-specific rather than general-purpose:

```tsx
// Separate interfaces for different components
interface LessonViewProps {
  lesson: Lesson;
  onComplete: (lessonId: string) => void;
}

interface ExerciseSubmissionProps {
  onSubmit: (answer: any) => void;
  onSkip?: () => void;
}

interface AudioPlayerProps {
  audioUrl: string;
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
}

// Components use only the interfaces they need
const AudioRecorder: React.FC<{
  onRecordingComplete: (audioBlob: Blob) => void;
  maxDuration?: number;
  showVisualizer?: boolean;
}> = ({ onRecordingComplete, maxDuration = 30, showVisualizer = true }) => {
  // Implementation
};
```

#### 5. Dependency Inversion Principle

High-level modules depend on abstractions, not concrete implementations:

```tsx
// ApiService interface
interface ApiService {
  get<T>(url: string, params?: Record<string, any>): Promise<T>;
  post<T>(url: string, data: any, params?: Record<string, any>): Promise<T>;
  put<T>(url: string, data: any, params?: Record<string, any>): Promise<T>;
  delete<T>(url: string, params?: Record<string, any>): Promise<T>;
}

// Implementation of ApiService
class HttpApiService implements ApiService {
  private baseUrl: string;
  private authToken?: string;
  
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }
  
  setAuthToken(token: string): void {
    this.authToken = token;
  }
  
  async get<T>(url: string, params?: Record<string, any>): Promise<T> {
    // Implementation using fetch or axios
  }
  
  async post<T>(url: string, data: any, params?: Record<string, any>): Promise<T> {
    // Implementation
  }
  
  async put<T>(url: string, data: any, params?: Record<string, any>): Promise<T> {
    // Implementation
  }
  
  async delete<T>(url: string, params?: Record<string, any>): Promise<T> {
    // Implementation
  }
}

// Services depend on the interface, not the implementation
class LanguageService {
  private api: ApiService;
  
  constructor(api: ApiService) {
    this.api = api;
  }
  
  async getLanguages(): Promise<Language[]> {
    return this.api.get<Language[]>('/languages');
  }
  
  async getLanguageById(id: string): Promise<Language> {
    return this.api.get<Language>(`/languages/${id}`);
  }
}
```

### Data Flow and State Management

```
┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐
│                 │      │                 │      │                 │
│  React          │      │  Redux Store    │      │  API Services   │
│  Components     │ ───► │  (State)        │ ───► │                 │
│                 │      │                 │      │                 │
└────────┬────────┘      └────────┬────────┘      └────────┬────────┘
         │                        │                        │
         │                        │                        │
         ▼                        ▼                        ▼
┌────────┴────────┐      ┌────────┴────────┐      ┌────────┴────────┐
│                 │      │                 │      │                 │
│  Actions /      │      │  Reducers /     │      │  API            │
│  Event Handlers │ ◄─── │  Selectors      │ ◄─── │  Responses      │
│                 │      │                 │      │                 │
└─────────────────┘      └─────────────────┘      └─────────────────┘
```

Redux is used for global application state with a typical flow:
1. User interaction triggers an action creator
2. Action creator dispatches an action (possibly async with Redux Thunk)
3. Reducers process the action and update state
4. Components access state via selectors with React-Redux hooks

For local component state and side effects, React Hooks are used:
- `useState` for component-specific state
- `useEffect` for side effects and lifecycle management
- `useContext` for accessing context values
- Custom hooks for reusable logic

## Backend Implementation

### Project Structure

```
/src
├── config/                 # Configuration files
├── controllers/            # Route handlers
├── db/                     # Database setup and migrations
├── dto/                    # Data Transfer Objects
├── entities/               # Database entity definitions
├── exceptions/             # Custom exception classes
├── guards/                 # Authentication and authorization guards
├── interfaces/             # TypeScript interfaces
├── middleware/             # Express/NestJS middleware
├── repositories/           # Data access layer
├── services/               # Business logic
├── utils/                  # Utility functions
└── validators/             # Request validation
```

### NestJS Modules

```typescript
// Language module with NestJS architecture
@Module({
  imports: [
    TypeOrmModule.forFeature([Language, Course, Lesson, Exercise]),
    AuthModule,
    CacheModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        store: redisStore,
        host: configService.get('REDIS_HOST'),
        port: configService.get('REDIS_PORT'),
        ttl: 60 * 60 * 24, // 24 hours
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [
    LanguageController,
    CourseController,
    LessonController,
    ExerciseController,
  ],
  providers: [
    LanguageService,
    CourseService,
    LessonService,
    ExerciseService,
    LanguageRepository,
    CourseRepository,
    LessonRepository,
    ExerciseRepository,
  ],
  exports: [
    LanguageService,
    CourseService,
    LessonService,
    ExerciseService,
  ],
})
export class LanguageModule {}
```

### Repository Pattern Implementation

```typescript
// Repository pattern with TypeORM
@EntityRepository(Language)
export class LanguageRepository extends Repository<Language> {
  async findActiveLanguages(): Promise<Language[]> {
    return this.find({
      where: { isActive: true },
      order: { name: 'ASC' },
    });
  }

  async findLanguageWithCourses(id: string): Promise<Language | undefined> {
    return this.findOne(id, {
      relations: ['courses'],
      where: { isActive: true },
    });
  }

  async findLanguageByRegion(region: string): Promise<Language[]> {
    return this.find({
      where: { region, isActive: true },
      order: { speakersCount: 'DESC' },
    });
  }

  async incrementSpeakerCount(id: string, count: number = 1): Promise<void> {
    await this.createQueryBuilder()
      .update(Language)
      .set({
        speakersCount: () => `speakers_count + ${count}`,
      })
      .where('id = :id', { id })
      .execute();
  }
}
```

### Service Layer Implementation

```typescript
// Service layer with business logic
@Injectable()
export class LessonService {
  constructor(
    private readonly lessonRepository: LessonRepository,
    private readonly exerciseRepository: ExerciseRepository,
    private readonly userProgressRepository: UserProgressRepository,
    private readonly cacheManager: Cache,
  ) {}

  async getLessonById(id: string): Promise<Lesson> {
    // Try to get from cache first
    const cachedLesson = await this.cacheManager.get<Lesson>(`lesson:${id}`);
    if (cachedLesson) {
      return cachedLesson;
    }

    // If not in cache, get from database
    const lesson = await this.lessonRepository.findOne(id, {
      relations: ['course', 'course.language'],
    });

    if (!lesson) {
      throw new NotFoundException(`Lesson with ID ${id} not found`);
    }

    // Store in cache
    await this.cacheManager.set(`lesson:${id}`, lesson, { ttl: 3600 });
    return lesson;
  }

  async getExercisesForLesson(
    id: string,
    userId: string,
  ): Promise<Exercise[]> {
    const lesson = await this.getLessonById(id);
    
    // Check if user can access this lesson
    const userProgress = await this.userProgressRepository.findLessonProgress(
      userId,
      lesson.course.id,
    );
    
    // Business logic to determine if user can access this lesson
    const canAccessLesson = this.canUserAccessLesson(lesson, userProgress);
    if (!canAccessLesson) {
      throw new ForbiddenException(
        'You need to complete previous lessons before accessing this one',
      );
    }
    
    return this.exerciseRepository.findByLessonId(id);
  }

  async markLessonAsCompleted(
    userId: string,
    lessonId: string,
    data: CompleteLessonDto,
  ): Promise<UserProgress> {
    const lesson = await this.getLessonById(lessonId);
    
    // Calculate XP based on performance
    const xpEarned = this.calculateXpEarned(data.score, data.timeSpent);
    
    // Update user progress
    return this.userProgressRepository.createOrUpdateProgress({
      userId,
      lessonId,
      status: 'completed',
      score: data.score,
      completionDate: new Date(),
      xpEarned,
      timeSpentSeconds: data.timeSpent,
    });
  }

  private canUserAccessLesson(
    lesson: Lesson,
    userProgress: UserProgress[],
  ): boolean {
    // Implementation of access logic
    // ...
  }

  private calculateXpEarned(score: number, timeSpent: number): number {
    // Implementation of XP calculation logic
    // ...
  }
}
```

### Controller Implementation

```typescript
// REST API controller
@Controller('api/v1/lessons')
@UseGuards(JwtAuthGuard)
export class LessonController {
  constructor(
    private readonly lessonService: LessonService,
    private readonly userService: UserService,
  ) {}

  @Get()
  @UseInterceptors(CacheInterceptor)
  async getAllLessons(
    @Query() query: GetLessonsQueryDto,
  ): Promise<PaginatedResponse<Lesson>> {
    return this.lessonService.getLessons(query);
  }

  @Get(':id')
  async getLessonById(@Param('id') id: string): Promise<Lesson> {
    return this.lessonService.getLessonById(id);
  }

  @Get(':id/exercises')
  async getLessonExercises(
    @Param('id') id: string,
    @User() user: UserEntity,
  ): Promise<Exercise[]> {
    return this.lessonService.getExercisesForLesson(id, user.id);
  }

  @Post(':id/complete')
  async completeLesson(
    @Param('id') id: string,
    @User() user: UserEntity,
    @Body() completeLessonDto: CompleteLessonDto,
  ): Promise<UserProgress> {
    // Log lesson completion for analytics
    this.userService.trackUserActivity(user.id, {
      activityType: 'LESSON_COMPLETED',
      lessonId: id,
      score: completeLessonDto.score,
    });
    
    return this.lessonService.markLessonAsCompleted(
      user.id,
      id,
      completeLessonDto,
    );
  }

  @Post()
  @Roles('admin', 'content-creator')
  @UsePipes(new ValidationPipe({ transform: true }))
  async createLesson(
    @Body() createLessonDto: CreateLessonDto,
    @User() user: UserEntity,
  ): Promise<Lesson> {
    return this.lessonService.createLesson({
      ...createLessonDto,
      createdBy: user.id,
    });
  }

  @Put(':id')
  @Roles('admin', 'content-creator')
  @UsePipes(new ValidationPipe({ transform: true }))
  async updateLesson(
    @Param('id') id: string,
    @Body() updateLessonDto: UpdateLessonDto,
    @User() user: UserEntity,
  ): Promise<Lesson> {
    return this.lessonService.updateLesson(id, {
      ...updateLessonDto,
      lastUpdatedBy: user.id,
    });
  }

  @Delete(':id')
  @Roles('admin')
  @HttpCode(204)
  async deleteLesson(@Param('id') id: string): Promise<void> {
    return this.lessonService.deleteLesson(id);
  }
}
```

## AI Components

### Speech Recognition System

```typescript
// Speech Recognition Service
@Injectable()
export class SpeechRecognitionService {
  private models: Map<string, any> = new Map();
  
  constructor(
    private readonly modelLoaderService: ModelLoaderService,
    private readonly configService: ConfigService,
    private readonly logger: LoggerService,
  ) {}
  
  async initialize(): Promise<void> {
    // Load models for active languages
    const activeLanguages = await this.modelLoaderService.getActiveLanguages();
    
    for (const language of activeLanguages) {
      try {
        const model = await this.modelLoaderService.loadSpeechModel(language.code);
        this.models.set(language.code, model);
        this.logger.log(`Loaded speech model for ${language.name}`);
      } catch (error) {
        this.logger.error(`Failed to load speech model for ${language.name}`, error);
      }
    }
  }
  
  async recognizeSpeech(
    audioData: Buffer,
    languageCode: string,
    options: RecognitionOptions = {},
  ): Promise<RecognitionResult> {
    const model = this.models.get(languageCode);
    
    if (!model) {
      throw new NotFoundException(`Speech model for language ${languageCode} not found`);
    }
    
    try {
      const result = await model.recognize(audioData, {
        sampleRate: options.sampleRate || 16000,
        maxAlternatives: options.maxAlternatives || 1,
        profanityFilter: options.profanityFilter !== false,
      });
      
      return {
        transcript: result.transcript,
        confidence: result.confidence,
        alternatives: result.alternatives || [],
      };
    } catch (error) {
      this.logger.error(`Speech recognition error for ${languageCode}`, error);
      throw new InternalServerErrorException('Speech recognition failed');
    }
  }
  
  async comparePronunciation(
    reference: string,
    spoken: string,
    languageCode: string,
  ): Promise<PronunciationAssessment> {
    const model = this.models.get(languageCode);
    
    if (!model) {
      throw new NotFoundException(`Speech model for language ${languageCode} not found`);
    }
    
    try {
      const assessment = await model.assessPronunciation(reference, spoken);
      
      return {
        overallScore: assessment.overallScore,
        fluencyScore: assessment.fluencyScore,
        pronunciationScore: assessment.pronunciationScore,
        wordLevelAssessment: assessment.wordScores,
        improvementSuggestions: assessment.suggestions,
      };
    } catch (error) {
      this.logger.error(`Pronunciation assessment error for ${languageCode}`, error);
      throw new InternalServerErrorException('Pronunciation assessment failed');
    }
  }
}
```

### Adaptive Learning Algorithm

```typescript
// Spaced Repetition System
@Injectable()
export class SpacedRepetitionService {
  constructor(
    private readonly userVocabularyRepository: UserVocabularyRepository,
    private readonly vocabularyRepository: VocabularyRepository,
  ) {}
  
  async scheduleReview(
    userId: string,
    vocabularyId: string,
    performance: number, // 0-1 score of how well the user remembered
  ): Promise<void> {
    // Get the current user vocabulary state
    const userVocab = await this.userVocabularyRepository.findOne({
      where: { userId, vocabularyId },
    });
    
    if (!userVocab) {
      // First encounter with this vocabulary
      const newInterval = this.calculateInitialInterval(performance);
      
      await this.userVocabularyRepository.save({
        userId,
        vocabularyId,
        proficiency: performance,
        lastReviewed: new Date(),
        nextReview: this.addDays(new Date(), newInterval),
        reviewCount: 1,
      });
      
      return;
    }
    
    // Calculate new interval using SM-2 algorithm
    const easeFactor = this.updateEaseFactor(userVocab.easeFactor || 2.5, performance);
    const newInterval = this.calculateNextInterval(
      userVocab.interval || 1,
      easeFactor,
      performance,
    );
    
    // Update user vocabulary
    await this.userVocabularyRepository.update(
      { userId, vocabularyId },
      {
        proficiency: (userVocab.proficiency + performance) / 2, // Running average
        lastReviewed: new Date(),
        nextReview: this.addDays(new Date(), newInterval),
        reviewCount: userVocab.reviewCount + 1,
        interval: newInterval,
        easeFactor,
      },
    );
  }
  
  async getDueVocabulary(
    userId: string,
    languageId: string,
    limit: number = 20,
  ): Promise<Vocabulary[]> {
    // Get vocabulary items due for review
    const dueItems = await this.userVocabularyRepository.find({
      where: {
        userId,
        nextReview: LessThan(new Date()),
        vocabulary: { languageId },
      },
      relations: ['vocabulary'],
      take: limit,
      order: { nextReview: 'ASC' },
    });
    
    return dueItems.map(item => item.vocabulary);
  }
  
  private calculateInitialInterval(performance: number): number {
    // Initial interval based on performance
    if (performance < 0.3) return 1; // Review tomorrow
    if (performance < 0.7) return 2; // Review in 2 days
    return 4; // Review in 4 days
  }
  
  private updateEaseFactor(currentEaseFactor: number, performance: number): number {
    // SM-2 algorithm ease factor update
    const newEaseFactor = currentEaseFactor + (0.1 - (5 - 5 * performance) * (0.08 + (5 - 5 * performance) * 0.02));
    
    // Ease factor should not be less than 1.3
    return Math.max(1.3, newEaseFactor);
  }
  
  private calculateNextInterval(currentInterval: number, easeFactor: number, performance: number): number {
    // If performance is too low, reset to a short interval
    if (performance < 0.3) return 1;
    
    // Based on SM-2 algorithm
    if (currentInterval === 1) return 6;
    if (currentInterval === 6) return Math.round(currentInterval * easeFactor);
    
    return Math.round(currentInterval * easeFactor);
  }
  
  private addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
}
```

### Content Generation and Verification

```typescript
// AI Content Generation and Verification Service
@Injectable()
export class ContentGenerationService {
  constructor(
    private readonly openAiService: OpenAiService,
    private readonly contentVerificationRepository: ContentVerificationRepository,
    private readonly languageRepository: LanguageRepository,
    private readonly userRepository: UserRepository,
    private readonly notificationService: NotificationService,
  ) {}
  
  async generateExercises(
    lessonId: string,
    lessonContent: string,
    languageId: string,
    exerciseTypes: string[],
    count: number = 5,
  ): Promise<GeneratedExercise[]> {
    // Get language details
    const language = await this.languageRepository.findOne(languageId);
    
    if (!language) {
      throw new NotFoundException(`Language with ID ${languageId} not found`);
    }
    
    // Prepare the prompt for AI
    const prompt = this.buildExerciseGenerationPrompt(
      lessonContent,
      language.name,
      language.englishName,
      exerciseTypes,
      count,
    );
    
    // Generate content using OpenAI
    const response = await this.openAiService.generateContent(prompt, {
      temperature: 0.7,
      maxTokens: 1500,
    });
    
    // Parse and validate the generated exercises
    const exercises = this.parseGeneratedExercises(response);
    
    // Create verification request for human expert review
    await this.contentVerificationRepository.save({
      contentType: 'exercise',
      relatedEntityId: lessonId,
      generatedContent: exercises,
      status: 'pending',
      languageId,
      generatedAt: new Date(),
    });
    
    // Notify language experts about pending verification
    await this.notifyLanguageExperts(languageId, lessonId);
    
    return exercises;
  }
  
  async verifyContent(
    verificationId: string,
    expertId: string,
    feedback: ContentFeedback,
  ): Promise<void> {
    // Get verification request
    const verification = await this.contentVerificationRepository.findOne(verificationId);
    
    if (!verification) {
      throw new NotFoundException(`Verification request ${verificationId} not found`);
    }
    
    // Update status based on feedback
    verification.status = feedback.approved ? 'approved' : 'rejected';
    verification.expertFeedback = feedback.comments;
    verification.expertId = expertId;
    verification.verifiedAt = new Date();
    
    // If modified content is provided, use that instead
    if (feedback.modifiedContent) {
      verification.approvedContent = feedback.modifiedContent;
    } else if (feedback.approved) {
      verification.approvedContent = verification.generatedContent;
    }
    
    await this.contentVerificationRepository.save(verification);
    
    // If approved, publish the content
    if (feedback.approved) {
      await this.publishVerifiedContent(verification);
    }
  }
  
  private async notifyLanguageExperts(languageId: string, lessonId: string): Promise<void> {
    // Find experts for this language
    const experts = await this.userRepository.findLanguageExperts(languageId);
    
    // Send notifications
    for (const expert of experts) {
      await this.notificationService.sendNotification(expert.id, {
        type: 'content_verification',
        title: 'New content needs verification',
        body: `New exercises for lesson ${lessonId} need your review`,
        data: { lessonId },
      });
    }
  }
  
  private buildExerciseGenerationPrompt(
    lessonContent: string,
    languageName: string,
    englishName: string,
    exerciseTypes: string[],
    count: number,
  ): string {
    // Implementation omitted for brevity
    // Creates a formatted prompt for the AI model
  }
  
  private parseGeneratedExercises(aiResponse: string): GeneratedExercise[] {
    // Implementation omitted for brevity
    // Parses and validates AI responses
  }
  
  private async publishVerifiedContent(verification: ContentVerification): Promise<void> {
    // Implementation omitted for brevity
    // Publishes verified content to the appropriate service
  }
}
```

## Development Setup

### Local Development Environment

```bash
# Clone the repository
git clone https://github.com/asili-learning/asili-app.git
cd asili-app

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Set up database
docker-compose up -d postgres redis
npm run db:migrate

# Generate API documentation
npm run docs:generate

# Start development server
npm run dev
```

### Docker Development Environment

```bash
# Start full development environment with Docker
docker-compose -f docker-compose.dev.yml up -d

# Run migrations
docker-compose exec app npm run db:migrate

# Seed database with initial data
docker-compose exec app npm run db:seed

# View logs
docker-compose logs -f app
```

### Testing

```bash
# Run all tests
npm test

# Run unit tests
npm run test:unit

# Run integration tests
npm run test:integration

# Run e2e tests
npm run test:e2e

# Generate test coverage report
npm run test:coverage
```

## Deployment

### Kubernetes Deployment

```yaml
# example-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: asili-api
  namespace: asili
spec:
  replicas: 3
  selector:
    matchLabels:
      app: asili-api
  template:
    metadata:
      labels:
        app: asili-api
    spec:
      containers:
      - name: api
        image: asili/api:latest
        ports:
        - containerPort: 3000
        env:
        - name: NODE_ENV
          value: "production"
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: asili-secrets
              key: database-url
        - name: JWT_SECRET
          valueFrom:
            secretKeyRef:
              name: asili-secrets
              key: jwt-secret
        resources:
          limits:
            cpu: "1"
            memory: "1Gi"
          requests:
            cpu: "500m"
            memory: "512Mi"
        livenessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /ready
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 5
      imagePullSecrets:
      - name: asili-registry
```

### CI/CD Pipeline

```yaml
# .github/workflows/main.yml
name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '16'
    - name: Install dependencies
      run: npm ci
    - name: Lint code
      run: npm run lint
    - name: Run tests
      run: npm test
    - name: Upload test coverage
      uses: codecov/codecov-action@v2

  build:
    needs: test
    if: github.event_name == 'push'
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Set up Docker Buildx
      uses: docker/setup-buildx-action@v1
    - name: Login to DockerHub
      uses: docker/login-action@v1
      with:
        username: ${{ secrets.DOCKERHUB_USERNAME }}
        password: ${{ secrets.DOCKERHUB_TOKEN }}
    - name: Build and push
      uses: docker/build-push-action@v2
      with:
        context: .
        push: true
        tags: asili/api:latest

  deploy-staging:
    needs: build
    if: github.ref == 'refs/heads/develop'
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Set up kubectl
      uses: azure/setup-kubectl@v1
    - name: Set Kubernetes context
      uses: azure/k8s-set-context@v1
      with:
        kubeconfig: ${{ secrets.KUBE_CONFIG_STAGING }}
    - name: Deploy to staging
      run: |
        kubectl apply -f k8s/staging/
        kubectl rollout restart deployment/asili-api -n asili-staging

  deploy-production:
    needs: build
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    environment: production
    steps:
    - uses: actions/checkout@v2
    - name: Set up kubectl
      uses: azure/setup-kubectl@v1
    - name: Set Kubernetes context
      uses: azure/k8s-set-context@v1
      with:
        kubeconfig: ${{ secrets.KUBE_CONFIG_PRODUCTION }}
    - name: Deploy to production
      run: |
        kubectl apply -f k8s/production/
        kubectl rollout restart deployment/asili-api -n asili-production
```

## Contributing

We welcome contributions to help preserve Kenya's linguistic heritage! Please review our contribution guidelines before submitting pull requests.

### Code Standards

- Follow the existing code style and structure
- Write unit tests for all new features
- Update documentation for any changes
- Follow conventional commit format
- Keep pull requests focused on a single feature or bug fix

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Acknowledgments

### Project Creator

**Ian Kuria** - Founder & Lead Developer
- Website: [kuria.pro](https://kuria.pro)
- LinkedIn: [Ian Kuria](https://linkedin.com/in/iankuria)
- Twitter: [@iankuria_](https://twitter.com/iankuria_)

Ian's vision and dedication to preserving Kenya's linguistic heritage have been the driving force behind Asili. His commitment to cultural authenticity, educational excellence, and technological innovation has shaped every aspect of this platform.

### Special Thanks

- The language experts and elders who contributed authentic content
- Kenya's Ministry of Education for curriculum guidance
- University of Nairobi Department of Linguistics
- Our community of early testers and supporters

## License

### Asili Proprietary License

Copyright © 2023-2025 Ian Kuria and Asili Language Technologies. All rights reserved.

This software and associated documentation files (the "Software") are the proprietary and confidential information of Ian Kuria and Asili Language Technologies. The Software contains trade secrets and copyrighted material of Asili Language Technologies.

#### Authorized Use

The Software is provided under license and may only be used in accordance with the terms of your license agreement with Asili Language Technologies. Unauthorized copying, modification, distribution, public display, use on unauthorized devices, or use beyond the terms of your license agreement is strictly prohibited.

#### Limited License for Contributors

Contributors to the Asili project may access and modify the code solely for the purpose of submitting contributions. By submitting a contribution, you agree to assign all intellectual property rights in your contribution to Asili Language Technologies.

#### Heritage Keeper License Exception

Language materials and cultural content contributed by recognized Heritage Keepers remain the cultural property of the respective communities, while the technical implementation and platform features remain proprietary to Asili Language Technologies.

For licensing inquiries or partnership opportunities, please contact licensing@asili.io

---

<p align="center">
  Made with ❤️ for Kenya's linguistic heritage
</p>
