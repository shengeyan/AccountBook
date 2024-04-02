import React, { useEffect, useState } from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useLocation,
} from 'react-router-dom'
import { ConfigProvider } from 'zarm'
import routes from '@/router'
import NavBar from '@/components/NavBar'

// 问题：出现location of undefined
// 解决：这是因为想要在函数组件内执行 useLocation，该组件必须被 Router 高阶组件包裹，我们做如下改动，将 App.jsx 的 Router 组件，前移到 main.jsx 内

function App() {
    const location = useLocation()
    const { pathname } = location // 获取当前路径
    const needNav = ['/', '/data', '/user'] // 需要底部导航栏的路径
    const [showNav, setShowNav] = useState(false) // 是否展示 Nav
    useEffect(() => {
        setShowNav(needNav.includes(pathname))
    }, [pathname]) // [] 内的参数若是变化，便会执行上述回调函数=
    return (
        <ConfigProvider primaryColor={'#007fff'}>
            <>
                <Routes>
                    {routes.map((route) => (
                        <Route
                            exact
                            key={route.path}
                            path={route.path}
                            element={<route.component />}
                        />
                    ))}
                </Routes>
                <NavBar showNav={showNav} />
            </>
        </ConfigProvider>
    )
}
export default App
