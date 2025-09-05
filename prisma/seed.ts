// prisma/seed.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create a comprehensive survey
  const survey = await prisma.survey.create({
    data: {
      name: 'Comprehensive Personal Information Survey',
      description: 'Collect demographic, health, and financial information for personalized services',
      isActive: true,
      sections: {
        create: [
          {
            title: 'Basic Information',
            order: 1,
            questions: {
              create: [
                {
                  text: 'First name',
                  type: 'text',
                  required: true,
                  order: 1,
                },
                {
                  text: 'Last name',
                  type: 'text',
                  required: true,
                  order: 2,
                },
                {
                  text: 'Phone number',
                  type: 'phone',
                  required: false,
                  order: 3,
                },
                {
                  text: 'Email',
                  type: 'email',
                  required: true,
                  order: 4,
                },
                {
                  text: 'Company',
                  type: 'text',
                  required: false,
                  order: 5,
                },
              ],
            },
          },
          {
            title: 'Demographic Information',
            order: 2,
            questions: {
              create: [
                {
                  text: 'Date of birth',
                  type: 'date',
                  required: true,
                  order: 1,
                },
                {
                  text: 'Gender',
                  type: 'select',
                  required: true,
                  order: 2,
                  options: {
                    choices: [
                      { value: 'male', label: 'Male' },
                      { value: 'female', label: 'Female' },
                      { value: 'non-binary', label: 'Non-binary' },
                      { value: 'prefer-not-to-say', label: 'Prefer not to say' },
                    ],
                  },
                },
                {
                  text: 'Marital status',
                  type: 'select',
                  required: false,
                  order: 3,
                  options: {
                    choices: [
                      { value: 'single', label: 'Single' },
                      { value: 'married', label: 'Married' },
                      { value: 'divorced', label: 'Divorced' },
                      { value: 'widowed', label: 'Widowed' },
                      { value: 'separated', label: 'Separated' },
                      { value: 'domestic-partnership', label: 'Domestic Partnership' },
                    ],
                  },
                },
                {
                  text: 'Country of residence',
                  type: 'country',
                  required: true,
                  order: 4,
                  options: {
                    choices: [
                      { value: 'US', label: 'United States' },
                      { value: 'CA', label: 'Canada' },
                      { value: 'GB', label: 'United Kingdom' },
                      { value: 'AU', label: 'Australia' },
                      { value: 'DE', label: 'Germany' },
                      { value: 'FR', label: 'France' },
                      { value: 'IT', label: 'Italy' },
                      { value: 'ES', label: 'Spain' },
                      { value: 'NL', label: 'Netherlands' },
                      { value: 'SE', label: 'Sweden' },
                      { value: 'NO', label: 'Norway' },
                      { value: 'DK', label: 'Denmark' },
                      { value: 'JP', label: 'Japan' },
                      { value: 'CN', label: 'China' },
                      { value: 'IN', label: 'India' },
                      { value: 'BR', label: 'Brazil' },
                      { value: 'MX', label: 'Mexico' },
                      { value: 'AR', label: 'Argentina' },
                      { value: 'ZA', label: 'South Africa' },
                      { value: 'other', label: 'Other' },
                    ],
                  },
                },
                {
                  text: 'State/Province',
                  type: 'text',
                  required: true,
                  order: 5,
                },
                {
                  text: 'City',
                  type: 'text',
                  required: true,
                  order: 6,
                },
                {
                  text: 'Zip/Postal code',
                  type: 'text',
                  required: true,
                  order: 7,
                },
                {
                  text: 'Ethnicity',
                  type: 'multiselect',
                  required: false,
                  order: 8,
                  options: {
                    choices: [
                      { value: 'white', label: 'White' },
                      { value: 'black', label: 'Black or African American' },
                      { value: 'hispanic', label: 'Hispanic or Latino' },
                      { value: 'asian', label: 'Asian' },
                      { value: 'native-american', label: 'Native American or Alaska Native' },
                      { value: 'pacific-islander', label: 'Native Hawaiian or Pacific Islander' },
                      { value: 'other', label: 'Other' },
                      { value: 'prefer-not-to-say', label: 'Prefer not to say' },
                    ],
                  },
                },
                {
                  text: 'Highest level of education',
                  type: 'select',
                  required: false,
                  order: 9,
                  options: {
                    choices: [
                      { value: 'high-school', label: 'High school or equivalent' },
                      { value: 'some-college', label: 'Some college' },
                      { value: 'associates', label: "Associate's degree" },
                      { value: 'bachelors', label: "Bachelor's degree" },
                      { value: 'masters', label: "Master's degree" },
                      { value: 'doctorate', label: 'Doctorate' },
                      { value: 'professional', label: 'Professional degree' },
                      { value: 'other', label: 'Other' },
                    ],
                  },
                },
                {
                  text: 'Number of dependents',
                  type: 'number',
                  required: false,
                  order: 10,
                  options: {
                    min: 0,
                    max: 20,
                  },
                },
              ],
            },
          },
          {
            title: 'Health Information',
            order: 3,
            questions: {
              create: [
                {
                  text: 'How would you rate your overall health?',
                  type: 'scale',
                  required: true,
                  order: 1,
                  options: {
                    min: 1,
                    max: 10,
                    minLabel: 'Poor',
                    maxLabel: 'Excellent',
                  },
                },
                {
                  text: 'Do you have health insurance?',
                  type: 'radio',
                  required: true,
                  order: 2,
                  options: {
                    choices: [
                      { value: 'yes', label: 'Yes' },
                      { value: 'no', label: 'No' },
                    ],
                  },
                },
                {
                  text: 'Type of health insurance',
                  type: 'select',
                  required: false,
                  order: 3,
                  options: {
                    conditional: 'health_insurance_yes',
                    choices: [
                      { value: 'employer', label: 'Employer-provided' },
                      { value: 'private', label: 'Private insurance' },
                      { value: 'medicare', label: 'Medicare' },
                      { value: 'medicaid', label: 'Medicaid' },
                      { value: 'military', label: 'Military/TRICARE' },
                      { value: 'other', label: 'Other' },
                    ],
                  },
                },
                {
                  text: 'Do you have any chronic health conditions?',
                  type: 'multiselect',
                  required: false,
                  order: 4,
                  options: {
                    choices: [
                      { value: 'diabetes', label: 'Diabetes' },
                      { value: 'hypertension', label: 'High blood pressure' },
                      { value: 'heart-disease', label: 'Heart disease' },
                      { value: 'asthma', label: 'Asthma' },
                      { value: 'arthritis', label: 'Arthritis' },
                      { value: 'cancer', label: 'Cancer' },
                      { value: 'mental-health', label: 'Mental health condition' },
                      { value: 'none', label: 'None' },
                      { value: 'other', label: 'Other' },
                    ],
                  },
                },
                {
                  text: 'How often do you exercise?',
                  type: 'select',
                  required: false,
                  order: 5,
                  options: {
                    choices: [
                      { value: 'daily', label: 'Daily' },
                      { value: '4-6-week', label: '4-6 times per week' },
                      { value: '2-3-week', label: '2-3 times per week' },
                      { value: 'weekly', label: 'Once a week' },
                      { value: 'rarely', label: 'Rarely' },
                      { value: 'never', label: 'Never' },
                    ],
                  },
                },
                {
                  text: 'Do you smoke?',
                  type: 'radio',
                  required: false,
                  order: 6,
                  options: {
                    choices: [
                      { value: 'yes', label: 'Yes' },
                      { value: 'no', label: 'No' },
                      { value: 'former', label: 'Former smoker' },
                    ],
                  },
                },
                {
                  text: 'Average hours of sleep per night',
                  type: 'number',
                  required: false,
                  order: 7,
                  options: {
                    min: 0,
                    max: 24,
                    step: 0.5,
                  },
                },
                {
                  text: 'Last medical check-up',
                  type: 'select',
                  required: false,
                  order: 8,
                  options: {
                    choices: [
                      { value: '0-6-months', label: 'Within the last 6 months' },
                      { value: '6-12-months', label: '6-12 months ago' },
                      { value: '1-2-years', label: '1-2 years ago' },
                      { value: '2-5-years', label: '2-5 years ago' },
                      { value: '5-plus-years', label: 'More than 5 years ago' },
                    ],
                  },
                },
                {
                  text: 'Any allergies or dietary restrictions?',
                  type: 'textarea',
                  required: false,
                  order: 9,
                  options: {
                    placeholder: 'Please list any allergies or dietary restrictions',
                    rows: 3,
                  },
                },
              ],
            },
          },
          {
            title: 'Financial Information',
            order: 4,
            questions: {
              create: [
                {
                  text: 'Employment status',
                  type: 'select',
                  required: true,
                  order: 1,
                  options: {
                    choices: [
                      { value: 'full-time', label: 'Full-time employed' },
                      { value: 'part-time', label: 'Part-time employed' },
                      { value: 'self-employed', label: 'Self-employed' },
                      { value: 'unemployed', label: 'Unemployed' },
                      { value: 'retired', label: 'Retired' },
                      { value: 'student', label: 'Student' },
                      { value: 'homemaker', label: 'Homemaker' },
                      { value: 'disabled', label: 'Unable to work' },
                    ],
                  },
                },
                {
                  text: 'Industry',
                  type: 'select',
                  required: false,
                  order: 2,
                  options: {
                    choices: [
                      { value: 'technology', label: 'Technology' },
                      { value: 'healthcare', label: 'Healthcare' },
                      { value: 'finance', label: 'Finance' },
                      { value: 'education', label: 'Education' },
                      { value: 'retail', label: 'Retail' },
                      { value: 'manufacturing', label: 'Manufacturing' },
                      { value: 'construction', label: 'Construction' },
                      { value: 'hospitality', label: 'Hospitality' },
                      { value: 'government', label: 'Government' },
                      { value: 'non-profit', label: 'Non-profit' },
                      { value: 'other', label: 'Other' },
                    ],
                  },
                },
                {
                  text: 'Annual household income',
                  type: 'select',
                  required: false,
                  order: 3,
                  options: {
                    choices: [
                      { value: '0-25k', label: 'Less than $25,000' },
                      { value: '25-50k', label: '$25,000 - $49,999' },
                      { value: '50-75k', label: '$50,000 - $74,999' },
                      { value: '75-100k', label: '$75,000 - $99,999' },
                      { value: '100-150k', label: '$100,000 - $149,999' },
                      { value: '150-200k', label: '$150,000 - $199,999' },
                      { value: '200k-plus', label: '$200,000 or more' },
                      { value: 'prefer-not-to-say', label: 'Prefer not to say' },
                    ],
                  },
                },
                {
                  text: 'Primary source of income',
                  type: 'select',
                  required: false,
                  order: 4,
                  options: {
                    choices: [
                      { value: 'salary', label: 'Salary/Wages' },
                      { value: 'business', label: 'Business income' },
                      { value: 'investments', label: 'Investments' },
                      { value: 'retirement', label: 'Retirement/Pension' },
                      { value: 'social-security', label: 'Social Security' },
                      { value: 'disability', label: 'Disability benefits' },
                      { value: 'other', label: 'Other' },
                    ],
                  },
                },
                {
                  text: 'Do you own or rent your home?',
                  type: 'radio',
                  required: false,
                  order: 5,
                  options: {
                    choices: [
                      { value: 'own', label: 'Own' },
                      { value: 'rent', label: 'Rent' },
                      { value: 'other', label: 'Other arrangement' },
                    ],
                  },
                },
                {
                  text: 'Monthly housing payment',
                  type: 'currency',
                  required: false,
                  order: 6,
                  options: {
                    currency: 'USD',
                    placeholder: 'Enter amount',
                  },
                },
                {
                  text: 'Types of debt',
                  type: 'multiselect',
                  required: false,
                  order: 7,
                  options: {
                    choices: [
                      { value: 'mortgage', label: 'Mortgage' },
                      { value: 'auto-loan', label: 'Auto loan' },
                      { value: 'student-loan', label: 'Student loan' },
                      { value: 'credit-card', label: 'Credit card debt' },
                      { value: 'personal-loan', label: 'Personal loan' },
                      { value: 'medical-debt', label: 'Medical debt' },
                      { value: 'none', label: 'No debt' },
                      { value: 'other', label: 'Other' },
                    ],
                  },
                },
                {
                  text: 'Credit score range',
                  type: 'select',
                  required: false,
                  order: 8,
                  options: {
                    choices: [
                      { value: 'excellent', label: 'Excellent (750+)' },
                      { value: 'good', label: 'Good (700-749)' },
                      { value: 'fair', label: 'Fair (650-699)' },
                      { value: 'poor', label: 'Poor (below 650)' },
                      { value: 'unknown', label: "Don't know" },
                    ],
                  },
                },
                {
                  text: 'Do you have an emergency fund?',
                  type: 'radio',
                  required: false,
                  order: 9,
                  options: {
                    choices: [
                      { value: 'yes', label: 'Yes' },
                      { value: 'no', label: 'No' },
                      { value: 'building', label: 'Currently building one' },
                    ],
                  },
                },
                {
                  text: 'Retirement savings',
                  type: 'multiselect',
                  required: false,
                  order: 10,
                  options: {
                    choices: [
                      { value: '401k', label: '401(k)' },
                      { value: 'ira', label: 'IRA' },
                      { value: 'pension', label: 'Pension' },
                      { value: 'stocks', label: 'Stocks/Bonds' },
                      { value: 'real-estate', label: 'Real estate' },
                      { value: 'savings', label: 'Savings account' },
                      { value: 'none', label: 'No retirement savings' },
                      { value: 'other', label: 'Other' },
                    ],
                  },
                },
                {
                  text: 'Financial goals for the next year',
                  type: 'textarea',
                  required: false,
                  order: 11,
                  options: {
                    placeholder: 'What are your main financial goals?',
                    rows: 3,
                  },
                },
              ],
            },
          },
        ],
      },
    },
  });

  console.log(`Created survey with ID: ${survey.id}`);

  // Create a test user
  const testUser = await prisma.user.create({
    data: {
      email: 'test@example.com',
      passwordHash: 'hashed_password_here', // In real implementation, use proper hashing
    },
  });

  console.log(`Created test user: ${testUser.email}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });