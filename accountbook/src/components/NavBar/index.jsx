import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { TabBar } from 'zarm'
import { useNavigate } from 'react-router-dom'
import s from './style.module.less'
import CustomIcon from '../CustomIcon'
import { useLocation } from 'react-router-dom'

const NavBar = ({ showNav }) => {
    // const [activeKey, setActiveKey] = useState('/')
    const [activeKey, setActiveKey] = useState(useLocation().pathname)
    const navigateTo = useNavigate()

    const changeTab = (path) => {
        setActiveKey(path)
        navigateTo(path)
    }

    return (
        <TabBar
            visible={showNav}
            className={s.tab}
            activeKey={activeKey}
            onChange={changeTab}
        >
            <TabBar.Item
                itemKey="/"
                title="账单"
                icon={<CustomIcon type="zhangdan" />}
            />
            <TabBar.Item
                itemKey="/data"
                title="统计"
                icon={<CustomIcon type="tongji" />}
            />
            <TabBar.Item
                itemKey="/user"
                title="我的"
                icon={<CustomIcon type="wode" />}
            />
        </TabBar>
    )
}

NavBar.propTypes = {
    showNav: PropTypes.bool,
}

export default NavBar

// 问题：Nav 并没有出现在底部
// 解决：因为zarm版本问题 修改为2.9.16即可解决
