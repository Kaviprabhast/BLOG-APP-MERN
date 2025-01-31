import React, { useState, useEffect } from 'react';
import './CSS/Subscribe.css';
import Header from './Header';
import Footer from './Pages/Footer';
import subscribeSound from './sounds/Subscribe.mp3'; 
import unsubscribeSound from './sounds/Unsubscribe.mp3';

const Subscribe = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [subscribedEmails, setSubscribedEmails] = useState([]); 

    useEffect(() => {
        fetch('http://localhost:4000/subscribers')
            .then(response => response.json())
            .then(data => setSubscribedEmails(data.subscribers))
            .catch(error => console.error('Error fetching subscribers:', error));
    }, []);

    const handleSubscribe = async (e) => {
        e.preventDefault();
        const subscribeAudio = new Audio(subscribeSound);
        subscribeAudio.play();

        try {
            const response = await fetch('http://localhost:4000/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(data.message);
                setSubscribedEmails([...subscribedEmails, email]); 
                setEmail(''); 
            } else {
                setMessage(data.message || 'Error subscribing. Please try again.');
            }
        } catch (err) {
            console.error('Error:', err);
            setMessage('Error subscribing. Please try again.');
        }
    };

    const handleUnsubscribe = async (emailToRemove) => {
        const unsubscribeAudio = new Audio(unsubscribeSound);
        unsubscribeAudio.play();

        try {
            const response = await fetch('http://localhost:4000/unsubscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: emailToRemove }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(data.message);
                setSubscribedEmails(subscribedEmails.filter(e => e !== emailToRemove)); 
            } else {
                setMessage(data.message || 'Error unsubscribing. Please try again.');
            }
        } catch (err) {
            console.error('Error:', err);
            setMessage('Error unsubscribing. Please try again.');
        }
    };

    return (
        <div>
            <Header />
            <div className="subscribe-container">
                <h2>Subscribe to My Blog</h2>
                <form onSubmit={handleSubscribe} className="subscribe-form">
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <button type="submit" className="subscribe-button">
                        Subscribe
                    </button>
                </form>

                {message && <p className="subscribe-message">{message}</p>}

                <h3>Subscribed Emails:</h3>
                <ul>
                    {subscribedEmails.map((subscribedEmail, index) => (
                        <li key={index}>
                            {subscribedEmail}
                            <button onClick={() => handleUnsubscribe(subscribedEmail)} className="unsubscribe-button">
                                Unsubscribe
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            <Footer />
        </div>
    );
};

export default Subscribe;
