import styled from 'styled-components';

export const Wrapper = styled.aside`
    font-family: Arial, Helvetica, sans-serif;
    width: 100%; /* Default width for small screens */

    @media (min-width: 768px) {
        /* Adjust width for medium-sized screens */
        width: 500px;
    }

    padding: 20px;
`;
