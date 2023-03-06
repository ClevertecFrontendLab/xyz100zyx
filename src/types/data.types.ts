export type FetchedBooks = {
  issueYear: string;
  rating?: number;
  title: string;
  authors: string[];
  image?: {
    url: string;
  };
  categories: string[];
  id: number;
  booking?: {
    id: number;
    order: boolean;
    dateOrder: string;
    customerId: number;
    customerFirstName: string;
    customerLastName: string;
  };
  delivery?: {
    id: number;
    handed: boolean;
    dateHandedFrom: string;
    dateHandedTo: string;
    recipientId: number;
    recipientFirstName: string;
    recipientLastName: string;
  };
  histories?: [
    {
      id: number;
      userId: number;
    }
  ];
};

export type FetchedBook = {
  id: number;
  title: string;
  rating: number | null;
  issueYear: string;
  description: string;
  publish: string;
  pages: string;
  cover: string;
  weight: string;
  format: string;
  ISBN: string;
  producer: string;
  authors: string[];
  images: { url: string }[];
  categories: string[];
  comments: [
    {
      id: 1;
      rating: 4;
      text: 'Самая лучшая книга в мире';
      createdAt: '2022-10-23T12:23:13.012Z';
      user: {
        commentUserId: 6;
        firstName: 'Aliaksei';
        lastName: 'Valadzko';
        avatarUrl: '/uploads/thumbnail_Screenshot_3_1016a62c87.png';
      };
    }
  ];
  booking: {
    id: 7;
    order: true;
    dateOrder: '2022-10-24T00:00:00.000Z';
    customerId: 6;
    customerFirstName: 'Алексей';
    customerLastName: 'Володько';
  };
  delivery: {
    id: 7;
    handed: true;
    dateHandedFrom: '2022-10-24T00:00:00.000Z';
    dateHandedTo: '2022-10-28T00:00:00.000Z';
    recipientId: 6;
    recipientFirstName: 'Ал';
    recipientLastName: 'Вал';
  };
  histories: [
    {
      id: number;
      userId: number;
    }
  ];
};

export type Category = {
  name: string;
  path: string;
  id: number;
  count?: number;
};

export type FetchedError = {
  error: {
    status: number;
    name: string;
    message: string;
    details: Record<any, any>;
  };
  data: null;
};

export type Review = {
  id: number;
  rating: number;
  text: string;
  createdAt: string;
  user: {
    commentUserId: number;
    firstName: string;
    lastName: string;
    avatarUrl: string;
  };
};

export type User = {
  jwt: string;
  user: {
    id: number;
    username: string;
    email: string;
    provider: string;
    confirmed: boolean;
    blocked: boolean;
    createdAt: string;
    updatedAt: string;
    firstName: string;
    lastName: string;
    phone: string;
  };
};
