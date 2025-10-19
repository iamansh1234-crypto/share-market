// import { Button } from '@/components/ui/button'
// import React from 'react'

import { Button } from "@/components/ui/button"

// type Props = {}

// const page = (props: Props) => {
//   return (
//     <div>Front Page Budi <Button>Click me</Button></div>
    
//   )
// }

// export default page


const Home = () => {
  return (
     <div className="flex min-h-screen home-wrapper">
          <section className="grid w-full gap-8 home-section">
              <div className="md:col-span-1 xl:col-span-1">
                  {/* <TradingViewWidget
                    title="Market Overview"
                    scriptUrl={`${scriptUrl}market-overview.js`}
                    config={MARKET_OVERVIEW_WIDGET_CONFIG}
                    className="custom-chart"
                    height={600}
                  /> */}
                  Home
              </div>
              <div className="md-col-span xl:col-span-2">
                  {/* <TradingViewWidget
                      title="Stock Heatmap"
                      scriptUrl={`${scriptUrl}stock-heatmap.js`}
                      config={HEATMAP_WIDGET_CONFIG}
                      height={600}
                  /> */}
              </div>
          </section>
          </div>
  )
}

export default Home