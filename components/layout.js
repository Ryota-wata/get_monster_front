import Head from 'next/head'
import Header from './header'
import Footer from './footer'
import Link from 'next/link'

export default function Layout(props){
  return(
    <div>
      <Head>
        <title>{props.title}</title>
      </Head>
      <Header header="ゲットモンスター" />
      <div className='container'>
        <h3 className='my-3 text-primary text-center'>{props.title}</h3>
        {props.children}
      </div>
      <div>
        <h5 className='my-custom-class'>
          Aボタンを連打すればなぜかモンスターが捕まりやすくなると思っていたあの頃を思い出そう。
          (※注)PCでしか遊べません。
        </h5>
        <Link href="/pika">
          <button className='bg-blue-500 text-white p-4'>
            &lt;&lt; モンスターを捕まえに行く
          </button>
        </Link>
        <Link href="/party">
          <button className='bg-blue-500 text-white p-4'>
            &lt;&lt; リュックを見る
          </button>
        </Link>
      </div>
    </div>
  )
}