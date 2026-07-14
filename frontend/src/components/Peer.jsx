import { useState, useEffect } from 'react'
import { Link } from 'react-router'
import sendFollowRequest from '../api/sendFollowRequest';
import cancelFollowRequest from '../api/cancelFollowRequest';
import acceptFollowRequest from '../api/acceptFollowRequest';
import declineFollowRequest from '../api/declineFollowRequest';
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
                    followedUserId: success.request.followedUserId,
                }
            ]);
        } catch (err) {
            setError(err);
        };
    };

    async function handleCancelFollowRequest(id) {
        try {
            const success = await cancelFollowRequest(userId, id);
            setRequestSentPool((prevRequests) => {
                return prevRequests.filter((request) => request.followedUserId !== id)
            });
        } catch(err) {
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

    async function handleDeclineFollowRequest(id) {
        try {
            const success = await declineFollowRequest(userId, id);
            setRequestReceivedPool((prevRequests) => {
                return prevRequests.filter((request) => request.followingUserId !== id)
            });
        } catch(err) {
            setError(err);
        };
    };

    async function handleRemoveFollower(id) {
        try {
            const success = await removeFollower(userId, id);
            setFollowerPool((prevFollowers) => {
                return prevFollowers.filter((follower) => follower.followingUserId !== id)
            })
        } catch (err) {
            setError(err);
        };
    };

    async function handleRemoveFollowing(id) {
        try {
            const success = await removeFollower(id, userId);
            setFollowedPool((prevFollowers) => {
                return prevFollowers.filter((follower) => follower.followedUserId !== id)
            })
        } catch(err) {
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
                <Link to={`/user/peer/${peer.id}`}>
                    {peer.firstName} {peer.lastName}
                </Link>
                <button>Following</button>
                <button onClick={() => handleRemoveFollowing(peer.id)}>Stop Following</button>
                <button>Following You</button>
                <button onClick={() => handleRemoveFollower(peer.id)}>Remove Follower</button>
            </div>
        )
    }

    if (following && !followed && requestReceived) {
        return (
            <div>
                <Link to={`/user/peer/${peer.id}`}>
                    {peer.firstName} {peer.lastName}
                </Link>
                <button>Following</button>
                <button onClick={() => handleRemoveFollowing(peer.id)}>Stop Following</button>
                <button onClick={() => handleAcceptFollowRequest(peer.id)}>Accept Follow Request</button>
                <button onClick={() => handleDeclineFollowRequest(peer.id)}>Decline Follow Request</button>
            </div>
        )
    } else if (following && !followed) {
        return (
            <div>
                <Link to={`/user/peer/${peer.id}`}>
                    {peer.firstName} {peer.lastName}
                </Link>
                <button>Following</button>
                <button onClick={() => handleRemoveFollowing(peer.id)}>Stop Following</button>
            </div>
        )
    }

    if (!following && followed && requestSent) {
        return (
            <div>
                <Link to={`/user/peer/${peer.id}`}>
                    {peer.firstName} {peer.lastName}
                </Link>
                <button>Follow Request Sent</button>
                <button onClick={() => handleCancelFollowRequest(peer.id)}>Cancel Follow Request</button>
                <button>Following You</button>
                <button onClick={() => handleRemoveFollower(peer.id)}>Remove Follower</button>
            </div>
        )
    } else if (!following && followed) {
        return (
            <div>
                <Link to={`/user/peer/${peer.id}`}>
                    {peer.firstName} {peer.lastName}
                </Link>
                <button onClick={() => handleSendFollowRequest(peer.id)}>Follow</button>
                <button>Following You</button>
                <button onClick={() => handleRemoveFollower(peer.id)}>Remove Follower</button>
            </div>
        )
    }

    if (!following && !followed && requestSent && requestReceived) {
        return (
            <div>
                <Link to={`/user/peer/${peer.id}`}>
                    {peer.firstName} {peer.lastName}
                </Link>
                <button>Follow Request Sent</button>
                <button onClick={() => handleCancelFollowRequest(peer.id)}>Cancel Follow Request</button>
                <button onClick={() => handleAcceptFollowRequest(peer.id)}>Accept Follow Request</button>
                <button onClick={() => handleDeclineFollowRequest(peer.id)}>Decline Follow Request</button>
            </div>
        )
    } else if (!following && !followed && requestSent) {
        return (
            <div>
                <Link to={`/user/peer/${peer.id}`}>
                    {peer.firstName} {peer.lastName}
                </Link>
                <button>Follow Request Sent</button>
                <button onClick={() => handleCancelFollowRequest(peer.id)}>Cancel Follow Request</button>
            </div> 
        )
    } else if (!following && !followed && requestReceived) {
        return (
            <div>
                <Link to={`/user/peer/${peer.id}`}>
                    {peer.firstName} {peer.lastName}
                </Link>
                <button onClick={() => handleSendFollowRequest(peer.id)}>Follow</button>
                <button onClick={() => handleAcceptFollowRequest(peer.id)}>Accept Follow Request</button>
                <button onClick={() => handleDeclineFollowRequest(peer.id)}>Decline Follow Request</button>
            </div>
        )
    }

    return (
        <div>
            <Link to={`/user/peer/${peer.id}`}>
                {peer.firstName} {peer.lastName}
            </Link>
            <button onClick={() => handleSendFollowRequest(peer.id)}>Follow</button>
        </div>
    )
};

export default Peer;