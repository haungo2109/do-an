import React, { useEffect } from 'react';
import Feed from 'components/Feed';
import {  useSelector } from 'react-redux';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import Colors from '../config/Colors';

const WrapperList = styled.View`
    background-color: ${Colors.gray2};
    flex: 1;
`

function ListFeed(props) {
    const user = useSelector((state) => state.user);
    const { data, error, loading } = useSelector((state) => state.post);

    const checkLiked = (like=[]) =>{
        if (user) {
            return like.includes(user.id);
        }
        return false;
    }
	return (
		<WrapperList>
			{data.length !== 0 && data.map((c) => <Feed key={c.id} {...c} like={checkLiked(c.like)} />)}
			{loading && <ActivityIndicator size="large" color="#0000ff" />}
		</WrapperList>
	);
}

export default ListFeed;
