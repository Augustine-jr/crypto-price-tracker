# Crypto Table Web App

A responsive web application that displays real-time cryptocurrency prices using the CoinLore API. The app provides a paginated table view on desktop and a card-based layout on mobile for ease of access and readability.

## Features

- **Real-Time Cryptocurrency Data**: Fetches cryptocurrency data using the CoinLore API.
- **Responsive Design**: 
  - **Mobile**: Card-based layout for each cryptocurrency.
  - **Desktop**: Table view with headers and alternating row colors.
- **Pagination**: 
  - Displays 10 items per page.
  - Navigable through "Next" and "Previous" buttons.
  - Prevents navigation beyond available pages.
- **Error Handling**: Displays an error message if data fetching fails.
- **Optimized Code**: Uses `useMemo` and `useCallback` hooks for efficient rendering.

## Technologies Used

- **React** with functional components and hooks
- **Axios** for data fetching
- **CoinLore API** for cryptocurrency data
- **Tailwind CSS** for styling
- **React Icons** for navigation icons