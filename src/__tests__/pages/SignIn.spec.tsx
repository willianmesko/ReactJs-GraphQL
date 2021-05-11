import React from 'react';

import { render, fireEvent, waitFor } from '@testing-library/react';
import SignIn from '../../pages/SignIn';

const mockedHistoryPush = jest.fn();
const mockedSignIn = jest.fn();
const mockedAddToast = jest.fn();

jest.mock('react-router', () => {
  return {
    useHistory: () => ({
      push: mockedHistoryPush,
    }),
  };
});

jest.mock('../../hooks/useContext', () => {
  return {
    useApp: () => ({
      signIn: mockedSignIn,
    }),
  };
});

describe('SignInPage', () => {
  beforeEach(() => {
    mockedHistoryPush.mockClear();
  });
  it('should be able to sign in', async () => {
    const { getByPlaceholderText, getByText } = render(<SignIn />);

    const emailField = getByPlaceholderText('E-mail');
    const passwordField = getByPlaceholderText('Password');
    const buttonElement = getByText('SignIn');

    fireEvent.change(emailField, { target: { value: 'user@example.com' } });
    fireEvent.change(passwordField, { target: { value: '123456' } });

    fireEvent.click(buttonElement);

    await waitFor(
      () => {
        expect(mockedHistoryPush).toHaveBeenCalledWith('/');
      },
      { timeout: 2000 },
    );
  });
  it('should not be able to sign in because email is not valid', async () => {
    const { getByPlaceholderText, getByText } = render(<SignIn />);

    const emailField = getByPlaceholderText('E-mail');
    const passwordField = getByPlaceholderText('Password');
    const buttonElement = getByText('SignIn');

    fireEvent.change(emailField, { target: { value: 'not-valid-email' } });
    fireEvent.change(passwordField, { target: { value: '123456' } });

    fireEvent.click(buttonElement);

    await waitFor(
      () => {
        expect(mockedHistoryPush).not.toHaveBeenCalled();
      },
      { timeout: 2000 },
    );
  });
});
