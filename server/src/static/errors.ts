export enum ErrorTypesEnum {
  //Server
  SERVER_INTERNAL_ERROR = 'SERVER_INTERNAL_ERROR',
  VALIDATION_ERROR = 'VALIDATION_ERROR',

  // Auth
  AUTH_INVALID_EMAIL = 'AUTH_INVALID_EMAIL',
  AUTH_INVALID_PASSWORD = 'AUTH_INVALID_PASSWORD',
  AUTH_INVALID_ROLE = 'AUTH_INVALID_ROLE',
  USER_ALREADY_EXISTS = 'USER_ALREADY_EXISTS',
  USER_NON_EXISTENT = 'USER_NON_EXISTENT',

  // Listings
  LISTING_NOT_FOUND = 'LISTING_NOT_FOUND',
  LISTING_ALREADY_EXISTS = 'LISTING_ALREADY_EXISTS',
  LISTING_INVALID = 'LISTING_INVALID',
  LISTING_INVALID_TITLE = 'LISTING_INVALID_TITLE',
  LISTING_INVALID_DESCRIPTION = 'LISTING_INVALID_DESCRIPTION',
  LISTING_INVALID_START_DATE = 'LISTING_INVALID_START_DATE',
  LISTING_INVALID_END_DATE = 'LISTING_INVALID_END_DATE',
  LISTING_INVALID_HOURS_PER_DAY = 'LISTING_INVALID_HOURS_PER_DAY',
  LISTING_INVALID_JOB_DURATION_IN_DAYS = 'LISTING_INVALID_JOB_DURATION_IN_DAYS',
  LISTING_INVALID_JOB_OFFER_ID = 'LISTING_INVALID_JOB_OFFER_ID',
  LISTING_INVALID_EMPLOYER_ID = 'LISTING_INVALID_EMPLOYER_ID',
  LISTING_INVALID_LOCATION = 'LISTING_INVALID_LOCATION',
  LISTING_INVALID_PHOTO_URL = 'LISTING_INVALID_PHOTO_URL',

  //GENERAL
  NOT_FOUND = 'NOT_FOUND',
}

export enum ErrorMessagesEnum {
  //Server
  SERVER_INTERNAL_ERROR = 'Internal server error',
  VALIDATION_ERROR = 'Validation error',

  // Auth
  AUTH_INVALID_EMAIL = 'Invalid email',
  AUTH_INVALID_PASSWORD = 'Invalid password',
  AUTH_INVALID_ROLE = 'Invalid role',
  USER_ALREADY_EXISTS = 'User already exists',
  USER_NON_EXISTENT = 'User non existent',

  // Listings
  LISTING_NOT_FOUND = 'Listing not found',
  LISTING_ALREADY_EXISTS = 'Listing already exists',
  LISTING_INVALID = 'Invalid listing',
  LISTING_INVALID_TITLE = 'Invalid title',
  LISTING_INVALID_DESCRIPTION = 'Invalid description',
  LISTING_INVALID_START_DATE = 'Invalid start date',
  LISTING_INVALID_END_DATE = 'Invalid end date',
  LISTING_INVALID_HOURS_PER_DAY = 'Invalid hours per day',
  LISTING_INVALID_JOB_DURATION_IN_DAYS = 'Invalid job duration in days',
  LISTING_INVALID_JOB_OFFER_ID = 'Invalid job offer id',
  LISTING_INVALID_EMPLOYER_ID = 'Invalid employer id',
  LISTING_INVALID_LOCATION = 'Invalid location',
  LISTING_INVALID_PHOTO_URL = 'Invalid photo url',

  //GENERAL
  NOT_FOUND = 'Not found',
}
