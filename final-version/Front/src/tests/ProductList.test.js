// src/tests/ProductList.test.js
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import ProductList from '../components/ProductList';
import * as api from '../services/api';

// Simular la función getProducts para controlar el test
jest.spyOn(api, 'getProducts').mockResolvedValue([
    { id: 1, name: 'Producto 1', description: 'Descripción 1', price: '10.00', imageUrl: 'test1.webp' },
    { id: 2, name: 'Producto 2', description: 'Descripción 2', price: '20.00', imageUrl: 'test2.webp' }
]);

test('muestra la lista de productos', async () => {
    render(<ProductList token="test-token" />);
    await waitFor(() => {
        expect(screen.getByText(/Producto 1/i)).toBeInTheDocument();
        expect(screen.getByText(/Producto 2/i)).toBeInTheDocument();
    });
});
