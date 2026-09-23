import {
  fetchDashboardSummary,
  isAbortError,
  parseDashboardSummary,
} from './api';

describe('parseDashboardSummary', () => {
  const valid = {
    generatedAt: '2026-09-23T00:00:00.000Z',
    cards: [
      {
        key: 'totalUsers',
        label: 'Total Users',
        value: 1284,
        trend: '+4.2% vs last week',
      },
    ],
  };

  it('returns a well-formed summary', () => {
    expect(parseDashboardSummary(valid)).toEqual(valid);
  });

  it('rejects payloads that would crash card rendering', () => {
    expect(() => parseDashboardSummary(null)).toThrow(
      'Failed to load dashboard summary',
    );
    expect(() =>
      parseDashboardSummary({ ...valid, cards: [{ ...valid.cards[0], value: '1284' }] }),
    ).toThrow('Failed to load dashboard summary');
    expect(() => parseDashboardSummary({ generatedAt: valid.generatedAt })).toThrow(
      'Failed to load dashboard summary',
    );
  });
});

describe('isAbortError', () => {
  it('ignores cancelled in-flight dashboard fetches', () => {
    const abortErr = new Error('This operation was aborted');
    abortErr.name = 'AbortError';
    expect(isAbortError(abortErr)).toBe(true);
    expect(isAbortError(new Error('network down'))).toBe(false);
  });
});

describe('fetchDashboardSummary', () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it('sends the abort signal and Authorization header', async () => {
    const controller = new AbortController();
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        generatedAt: '2026-09-23T00:00:00.000Z',
        cards: [
          {
            key: 'totalUsers',
            label: 'Total Users',
            value: 10,
            trend: 'stable',
          },
        ],
      }),
    });

    await fetchDashboardSummary('token-123', { signal: controller.signal });

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/dashboard/summary'),
      expect.objectContaining({
        headers: { Authorization: 'Bearer token-123' },
        signal: controller.signal,
      }),
    );
  });

  it('does not treat a later success-shaped body as data when unauthorized', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 401,
      json: async () => ({ message: 'Unauthorized' }),
    });

    await expect(fetchDashboardSummary('expired')).rejects.toThrow(
      'Could not load dashboard data. Your session may have expired.',
    );
  });
});
