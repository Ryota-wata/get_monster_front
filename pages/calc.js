import Layout from '../components/layout'
import Calc from '../components/Calc'

export default function Home(){
  return (
    <div>
      <Layout header="Next.js" title="プログラマブル電卓">
        <div className='text-center'>
          <Calc />
        </div>
      </Layout>
    </div>
  )
}