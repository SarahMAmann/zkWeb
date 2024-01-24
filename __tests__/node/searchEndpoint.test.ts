import supertest from 'supertest';
import { NextResponse } from 'next/server';
import { createClient } from '../../utils/supabase/server';
import { cookies } from 'next/headers';
import { POST } from '../../app/api/search/route';

jest.mock('../../utils/supabase/server', () => ({
  createClient: jest.fn(),
}));

jest.mock('next/headers', () => ({
  cookies: jest.fn(),
}));

describe('POST Endpoint', () => {
  let request: supertest.SuperTest<supertest.Test>;

  beforeAll(() => {
    //@ts-ignore
    request = supertest.agent('http://localhost:3000');
  });

  it('should return data when a valid searchText is provided', async () => {
    const searchText = 'test';

    const mockSupabaseResponse = {
      data: [{ title: 'Test Proof' }],
      error: null,
    };

    (createClient as jest.Mock).mockReturnValue({
      from: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      textSearch: jest.fn().mockResolvedValue(mockSupabaseResponse),
    });

    (cookies as jest.Mock).mockReturnValue({});

    const response = await request
      .post('/api/search')
      .send({ searchText })
      .set('Content-Type', 'application/json');

    expect(response.status).toBe(200);
  });

  it('should return an error when an invalid searchText is provided', async () => {
    const searchText = 'invalidSearchText';

    const mockSupabaseResponse = {
      data: [],
      error: null,
    };

    (createClient as jest.Mock).mockReturnValue({
      from: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      textSearch: jest.fn().mockResolvedValue(mockSupabaseResponse),
    });

    (cookies as jest.Mock).mockReturnValue({});

    const response = await request
      .post('/api/search')
      .send({ searchText })
      .set('Content-Type', 'application/json');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockSupabaseResponse);
  });

});
