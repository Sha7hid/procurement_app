import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

function LandingPage() {
    return (
        <><Navbar /><div style={styles.container}>
            <h1 style={styles.title}>Welcome to the Procurement App</h1>
            <p style={styles.description}>
                Manage your suppliers, items, and purchase orders efficiently with our application.
            </p>
            <div style={styles.buttonContainer}>
                <Link to="/suppliers" style={styles.button}>
                    Go to Suppliers
                </Link>
                <Link to="/items" style={styles.button}>
                    Go to Items
                </Link>
                <Link to="/purchase-orders" style={styles.button}>
                    Go to Purchase Orders
                </Link>
            </div>
        </div></>
    );
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'top',
        height: '100vh',
        textAlign: 'center',
        backgroundColor: '#f7f7f7',
        padding: '20px',
    },
    title: {
        fontSize: '2.5rem',
        margin: '20px 0',
    },
    description: {
        fontSize: '1.2rem',
        marginBottom: '40px',
    },
    buttonContainer: {
        display: 'flex',
        gap: '20px',
    },
    button: {
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: '#fff',
        textDecoration: 'none',
        borderRadius: '5px',
        transition: 'background-color 0.3s',
    },
};

export default LandingPage;
