// src/tests/Cart.test.js
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Cart from '../components/Cart';
import axios from 'axios';

jest.mock('axios');

test('muestra mensaje de carrito vacío cuando no hay items', async () => {
    axios.get.mockResolvedValue({ data: { cart: [] } });
    render(<Cart token="test-token" />);
    await waitFor(() => {
        expect(screen.getByText(/El carrito está vacío/i)).toBeInTheDocument();
    });
});
