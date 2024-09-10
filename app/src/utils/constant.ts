interface METHOD_INTERFACE {
  GET: string
  POST: string
  PUT: string
  PATCH: string
  DELETE: string
}
export const METHODS: METHOD_INTERFACE = {
  GET: 'get',
  POST: 'post',
  PATCH: 'patch',
  PUT: 'put',
  DELETE: 'delete',
}

export const categories: string[] = [
  'Relationships',
  'Confidence',
  'Stigma',
  'Identity',
  'Loneliness',
  'Communicating needs',
  'Loss',
  'Acceptance',
  'Anxiety',
  'Low mood',
]

export const SERVER_URL: string = 'https://soundfair-backend.vercel.app'

interface Categories {
  name: string
  description: string
}

export const categoriesData: Categories[] = [
  {
    name: 'Relationships',
    description: '',
  },
  {
    name: 'Confidence',
    description: '',
  },
  {
    name: 'Stigma',
    description: '',
  },
  {
    name: 'Identity',
    description: '',
  },
  {
    name: 'Loneliness',
    description: '',
  },
  {
    name: 'Communicating needs',
    description: '',
  },
  {
    name: 'Loss',
    description: '',
  },
  {
    name: 'Acceptance',
    description: '',
  },
  {
    name: 'Anxiety',
    description: '',
  },
  {
    name: 'Low mood',
    description: '',
  },
]

export const sessions = [
  {
    session_id: 7,
    name: 'Empowerment and disclosure',
    reading_time: '5 minutes',
    description:
      'In this activity, we will help you to understand if being open about your hearing loss is the right thing for you.',
    deleted: 0,
    type: 'Activity',
    createdAt: '2024-07-22T11:51:40.000Z',
    updatedAt: '2024-07-22T11:51:40.000Z',
    module_id: 6,
    Module: {
      module_id: 6,
      name: 'How to tackle stigma',
      category: 'Stigma',
    },
    Session_tips: [],
  },
  {
    session_id: 8,
    name: 'Introduction to empowerment and disclosure',
    reading_time: '2 minutes',
    description:
      'Empowerment and Disclosure sound like great superhero names. Keep reading to see if they can defeat the dreaded Stigma!',
    deleted: 0,
    type: 'Reading',
    createdAt: '2024-07-22T11:52:33.000Z',
    updatedAt: '2024-07-22T11:52:33.000Z',
    module_id: 6,
    Module: {
      module_id: 6,
      name: 'How to tackle stigma',
      category: 'Stigma',
    },
    Session_tips: [],
  },
  {
    session_id: 9,
    name: 'Creating some distance',
    reading_time: '5 minutes',
    description:
      'This activity uses defusion as a technique to step back from our stigmatising beliefs, reducing how impactful and convincing they feel.',
    deleted: 0,
    type: 'Activity',
    createdAt: '2024-07-22T11:53:09.000Z',
    updatedAt: '2024-07-22T11:53:09.000Z',
    module_id: 6,
    Module: {
      module_id: 6,
      name: 'How to tackle stigma',
      category: 'Stigma',
    },
    Session_tips: [],
  },
  {
    session_id: 10,
    name: 'Introduction to creating some distance',
    reading_time: '2 minutes',
    description:
      'Sometimes when we have self-stigmatising beliefs, it can be tricky to convince ourselves they aren’t true. Defusion helps us to see that these beliefs are only thoughts, not reality.',
    deleted: 0,
    type: 'Reading',
    createdAt: '2024-07-22T11:54:16.000Z',
    updatedAt: '2024-07-22T11:54:16.000Z',
    module_id: 6,
    Module: {
      module_id: 6,
      name: 'How to tackle stigma',
      category: 'Stigma',
    },
    Session_tips: [
      {
        tip_id: 2,
        details: 'Hello Session ',
      },
      {
        tip_id: 5,
        details: 'Hello Session 1',
      },
      {
        tip_id: 6,
        details: 'Hello Session 2',
      },
      {
        tip_id: 7,
        details: 'Hello Session 4',
      },
    ],
  },
]
