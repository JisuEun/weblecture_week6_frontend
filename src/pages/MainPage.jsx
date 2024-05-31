import React from 'react';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
  let navigate = useNavigate();

  const navigateToCounselor = () => {
    navigate('/chat-counselor');
  };

  const navigateToCounselee = () => {
    navigate('/chat-counselee');
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>클라이언트 종류를 선택하세요.</h1>
      <div style={styles.buttonContainer}>
        <button style={styles.button} onClick={navigateToCounselor}>
          상담사
        </button>
        <button style={styles.button} onClick={navigateToCounselee}>
          상담자
        </button>
      </div>
    </div>
  );
};

const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: '#f7f7f7'
    },
    heading: {
      color: '#333',
      marginBottom: '2rem'
    },
    buttonContainer: {
      display: 'flex',
      gap: '1rem'
    },
    button: {
      padding: '10px 20px',
      fontSize: '16px',
      color: 'white',
      backgroundColor: '#007bff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      outline: 'none'
    }
  };

export default MainPage;