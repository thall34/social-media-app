import { useState, useEffect } from 'react'
import sendFollowRequest from '../api/sendFollowRequest';
import acceptFollowRequest from '../api/acceptFollowRequest';
import removeFollower from '../api/removeFollower';

function Peer({
    userId,
    peer,
    requestSentPool,
    setRequestSentPool,
    requestReceivedPool,
    setRequestReceivedPool,
    followedPool,
    setFollowedPool,
    followerPool,
    setFollowerPool,
    setError
}) {
    async function handleSendFollowRequest(id) {
        try {
            const success = await sendFollowRequest(userId, id);
            setRequestSentPool((prevRequests) => [
                ...prevRequests, {
                    followedUserId: peer.id,
                }
            ]);
        } catch (err) {
            setError(err);
        };
    };

    async function handleAcceptFollowRequest(id) {
        try {
            const success = await acceptFollowRequest(userId, id);
            setRequestReceivedPool((prevRequests) => {
                return prevRequests.filter((request) => request.followingUserId !== id)
            });
            setFollowerPool((prevFollowers) => [
                ...prevFollowers, success.follower
            ]);
        } catch (err) {
            setError(err);
        };
    };

    async function handleRemoveFollower(id) {
        try {
            const success = await removeFollower(userId, id);
            setFollowerPool((prevFollowers) => {
                return prevFollowers.filter((follower) => follower.followedUserId === id)
            })
        } catch (err) {
            setError(err);
        };
    };

    const following = followedPool.some(follower => follower.followedUserId === peer.id);
    const followed = followerPool.some(follower => follower.followingUserId === peer.id);
    const requestSent = requestSentPool.some(request => request.followedUserId === peer.id);
    const requestReceived = requestReceivedPool.some(request => request.followingUserId === peer.id);

    if (following && followed) {
        return (
            <div>
                {peer.firstName} {peer.lastName}
                <button>Following</button>
                <button>Following You</button>
                <button onClick={() => handleRemoveFollower(peer.id)}>Remove Follower</button>
            </div>
        )
    }

    if (following && !followed && requestReceived) {
        return (
            <div>
                {peer.firstName} {peer.lastName}
                <button>Following</button>
                <button onClick={() => handleAcceptFollowRequest(peer.id)}>Accept Follow Request</button>
                <button>Decline Follow Request</button>
            </div>
        )
    } else if (following && !followed) {
        return (
            <div>
                {peer.firstName} {peer.lastName}
                <button>Following</button>
            </div>
        )
    }

    if (!following && followed && requestSent) {
        return (
            <div>
                {peer.firstName} {peer.lastName}
                <button>Follow Request Sent</button>
                <button>Cancel Follow Request</button>
                <button>Following You</button>
            </div>
        )
    } else if (!following && followed) {
        return (
            <div>
                {peer.firstName} {peer.lastName}
                <button onClick={() => handleSendFollowRequest(peer.id)}>Follow</button>
                <button>Following You</button>
            </div>
        )
    }

    if (!following && !followed && requestSent && requestReceived) {
        <div>
            {peer.firstName} {peer.lastName}
            <button>Follow Request Sent</button>
            <button>Cancel Follow Request</button>
            <button onClick={() => handleAcceptFollowRequest(peer.id)}>Accept Follow Request</button>
            <button>Decline Follow Request</button>
        </div>
    } else if (!following && !followed && requestSent) {
       <div>
            {peer.firstName} {peer.lastName}
            <button>Follow Request Sent</button>
            <button>Cancel Follow Request</button>
        </div> 
    } else if (!following && !followed && requestReceived) {
        <div>
            {peer.firstName} {peer.lastName}
            <button onClick={() => handleSendFollowRequest(peer.id)}>Follow</button>
            <button onClick={() => handleAcceptFollowRequest(peer.id)}>Accept Follow Request</button>
            <button>Decline Follow Request</button>
        </div>
    }

    return (
        <div>
            {peer.firstName} {peer.lastName}
            <button onClick={() => handleSendFollowRequest(peer.id)}>Follow</button>
        </div>
    )
};

export default Peer;