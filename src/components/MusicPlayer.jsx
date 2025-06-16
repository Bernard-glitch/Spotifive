import { useState } from 'react';

const MusicPlayer = () => {
    const [youtubeURL, setYoutubeURL] = useState('');
    const [embedURL, setEmbedURL] = useState('');

    const handleEmbed = () => {
        const videoId = extractYouTubeID(youtubeURL);
        if (videoId) {
            setEmbedURL(`https://www.youtube.com/embed/${videoId}`);
        }
    };

    // Helper to extract video ID from a YouTube URL
    const extractYouTubeID = (url) => {
        const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu.be\/)([\w-]+)/;
        const match = url.match(regex);
        return match ? match[1] : null;
    };

    return (
        <div className="music-player">
            <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                <input
                    type="text"
                    placeholder="Paste YouTube URL"
                    value={youtubeURL}
                    onChange={(e) => setYoutubeURL(e.target.value)}
                    style={{
                        padding: '0.4rem',
                        borderRadius: '6px',
                        border: 'none',
                        width: '60%',
                        maxWidth: '300px',
                        marginBottom: '0.5rem',
                    }}
                />
                <br />
                <button onClick={handleEmbed}>Play YouTube</button>
            </div>

            {embedURL && (
                <div className="youtube-embed" style={{ marginTop: '1rem' }}>
                    <iframe
                        width="300"
                        height="170"
                        src={embedURL}
                        title="YouTube Music"
                        frameBorder="0"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                    ></iframe>
                </div>
            )}
        </div>
    );
};

export default MusicPlayer;
