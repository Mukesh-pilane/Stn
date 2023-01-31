import React from 'react'
import {Routes, Route, useLocation, Outlet} from 'react-router-dom'

import Layout from '../../components/Layout'

export default function Home() {
    return (
        <Layout>
        <Outlet />
        </Layout>
    )
}