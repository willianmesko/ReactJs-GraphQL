import { renderHook, act } from '@testing-library/react-hooks';
import AppProvider from '../../hooks';
import { useAuth } from '../../hooks/useAuth';
import MockAdapter from 'axios-mock-adapter';
import api from '../../services/api';

const apiMock = new MockAdapter(api);

const mockedHistoryPush = jest.fn();
jest.mock('react-router', () => {
  return {
    useHistory: () => ({
      push: mockedHistoryPush,
    }),
  };
});

describe('App Hook', () => {
  it('should be able to sign in', async () => {
    const apiResponse = [
      {
        uuid: 'b687d939-0be6-4714-b9c0-92f2ae70fee9',
        name: 'User',
        email: 'user@example.com',
        password: '123456',
      },
    ];
    apiMock.onGet('/userData').reply(200, apiResponse);
    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AppProvider,
    });

    result.current.signIn({
      email: 'user@example.com',
      password: '123456',
    });

    await waitForNextUpdate({ timeout: 3000 });
    expect(setItemSpy).toHaveBeenCalledWith(
      '@growthHackers:user',
      JSON.stringify(apiResponse[0]),
    );
    expect(result.current.user.email).toEqual('user@example.com');
  });
  it('should restore saved data from storage when auth inits', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation(key => {
      switch (key) {
        case '@growthHackers:configs':
          return JSON.stringify({
            productCurrentPage: 1,
            favoritesCurrentPage: 1,
            productsOrder: 'lowerPrice',
            favoritesOrder: 'lowerPrice',
            productsQueryFilter: '',
            favoritesQueryFilter: '',
          });
        case '@growthHackers:user':
          return JSON.stringify({
            uuid: 'b687d939-0be6-4714-b9c0-92f2ae70fee9',
            name: 'User',
            email: 'user@example.com',
            password: '123456',
          });
        case '@growthHackers:favorites':
          return JSON.stringify({
            userUuid: 'b687d939-0be6-4714-b9c0-92f2ae70fee9',
            filters: [],
            products: [],
          });
        default:
          return null;
      }
    });

    const { result } = renderHook(() => useAuth(), {
      wrapper: AppProvider,
    });

    expect(result.current.user.email).toEqual('user@example.com');
  });

  it('should be able to sign out', async () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation(key => {
      switch (key) {
        case '@growthHackers:configs':
          return JSON.stringify({
            productCurrentPage: 1,
            favoritesCurrentPage: 1,
            productsOrder: 'lowerPrice',
            favoritesOrder: 'lowerPrice',
            productsQueryFilter: '',
            favoritesQueryFilter: '',
          });
        case '@growthHackers:user':
          return JSON.stringify({
            uuid: 'b687d939-0be6-4714-b9c0-92f2ae70fee9',
            name: 'User',
            email: 'user@example.com',
            password: '123456',
          });
        default:
          return null;
      }
    });

    const removeItemSpy = jest.spyOn(Storage.prototype, 'removeItem');

    const { result } = renderHook(() => useAuth(), {
      wrapper: AppProvider,
    });

    act(() => {
      result.current.signOut();
    });

    expect(removeItemSpy).toHaveBeenCalledTimes(2);
    expect(result.current.user).toBeUndefined();
  });
});
