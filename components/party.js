import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link'

function Bagpack() {
  const [monsters, setMonsters] = useState([]);

  useEffect(() => {
    // モンスターのデータを取得
    axios.get('http://localhost:8000/monsters') // サーバーのエンドポイントに合わせてURLを指定
      .then((response) => {
        setMonsters(response.data);
      })
      .catch((error) => {
        console.error('An error occurred:', error);
      });
  }, []);

  return (
    <div>
      <h2>モンスターリスト</h2><br></br>
      ここにミューツーおったらすごい<br/>
      <ul>
        {monsters.map((monster) => (
          <li key={monster.id}>{monster.name}</li>
        ))}
      </ul><br/>
      <Link href="/">
        <button className='btn btn-primary'>
          スタート画面に戻る
        </button>
      </Link>
    </div>
  );
}

export default Bagpack;
