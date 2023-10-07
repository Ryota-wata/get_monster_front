import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link'
import monster from '../public/myutwo.jpg';
import satoshi from '../public/satoshi.jpg';
import ball from '../public/ball.jpg';

export default function Battle() {
  const [count, setCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [monsterHit, setMonsterHit] = useState(false);
  const [ballClass, setBallClass] = useState('');
  const [imageSrc, setImageSrc] = useState(monster);
  const [message, setMessage] = useState('');
  const [startTime, setStartTime] = useState(null);

  // モンスターにボールが当たったらカウント開始
  useEffect(() => {
    if (!timeLeft || !monsterHit) return;

    const timerId = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timerId);
  }, [timeLeft, monsterHit]);

  // ボールを投げて、モンスターに当たったら画像をボールに切り替える
  const handleThrowBall = () => {
    setBallClass('throw-ball');
    setTimeout(() => {
      setMonsterHit(true);
      setImageSrc(ball);
      setBallClass('');
      if (!startTime) {
        setStartTime(Date.now());
      }
    }, 1000);
  };

  // Aボタンをクリックしたらカウントを開始
  const handleClick = () => {
    if (!startTime) {
      setStartTime(Date.now());
    }
  
    if (Date.now() - startTime <= 10000) {
      if (count < 80 && monsterHit) {
        setCount(count + 1);
      } else if (count >= 80 && monsterHit) {
        setCount(0);
        setTimeLeft(10);
        setMonsterHit(false);
        setImageSrc(ball); // ボールの画像を維持
        setMessage('モンスターゲットだぜ！！！');
        setStartTime(Date.now());
      }
    } else {
      setMessage('逃げられた、、、');
      setImageSrc(monster); // モンスターの画像に戻す
      setStartTime(null);
    }
  };
  
  async function handleSuccess() {
    try {
      const monsterData = {
        id: 1,
        name: 'ミューツー',
      };

      const response = await fetch('http://localhost:8000/catch_monster', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(monsterData),
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          alert('モンスターが仲間になりました！');
        } else {
          alert('逃げられた、、、');
        }
      } else {
        alert('エラー、、、');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }
  
  
  useEffect(() => {
    if (timeLeft === 0) {
      setMessage('逃げられた、、、');
      setImageSrc(monster); // モンスターの画像に戻す
    }
  }, [timeLeft]);

  return (
    <div className="pika">
        <div className="monster">
          <Image src={imageSrc} alt="Monster" width={400} height={400} />
        </div>
        <div className="human">
          <Image src={satoshi} alt="Human" width={400} height={300} />
        </div>
        <div className="button-box">
          <div className={`ball ${ballClass}`}>
            <Image src={ball} alt="Ball" width={50} height={50} />
          </div>
          <div className="button-content">
            <button onClick={handleThrowBall}>ボールを投げる</button><br /><br />
            <Link href="/">
              <button className='btn btn-primary'>
                逃げる
              </button>
            </Link>
            <br/><br/>
            <p>カウント： {count}</p>
            <p>残り時間：{timeLeft}</p>
          </div>
          　🎮遊び方🎮<br/>
            　1️⃣ボールを投げる<br/>
            　2️⃣モンスターがボールに入るとカウント開始<br/>
            　3️⃣１０秒のうちに８０回Aボタンを押せたらモンスターゲット　　　<br/>
            　<br/>
            　※Aボタン以外のボタンは機能しません。
          <div className="button-right">
            <div className="button-container">
              <div className="arrow-keys"><br/>
                <button className="arrow-button">△</button>
                <div className="arrow-row">
                  <button className="arrow-button">◁</button>
                  <button className="arrow-button">◯</button>
                  <button className="arrow-button">▷</button>
                </div>
                <button className="arrow-button">▽</button>
              </div>　
              <button className="a-button">B</button>
              <button className="a-button" onClick={handleClick}>A</button>
            <p>{message}</p>
            {message === 'モンスターゲットだぜ！！！' ? (
              <button onClick={() => handleSuccess()}>仲間にする</button>
            ) : message === '逃げられた、、、' ? (
              <button>残念</button>
            ) : null}
            </div>
          </div>
        </div>
    </div>
  );
}