import React, { useState } from 'react';
import { BACKEND_URL } from '../../../utils/constant';

interface VideoDebuggerProps {
    videoUrl: string;
    videoId: string;
}

const VideoDebugger: React.FC<VideoDebuggerProps> = ({ videoUrl, videoId }) => {
    const [testResult, setTestResult] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const testVideoUrl = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${BACKEND_URL}/api/v1/youtube/test-video-url`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ videoUrl })
            });

            const data = await response.json();
            setTestResult(data);
        } catch (error) {
            console.error('Error testing video URL:', error);
            setTestResult({ error: error instanceof Error ? error.message : 'Unknown error' });
        } finally {
            setLoading(false);
        }
    };

    const openInNewTab = () => {
        if (videoUrl) {
            window.open(videoUrl, '_blank');
        }
    };

    return (
        <div className="bg-gray-800 p-4 rounded-lg text-white text-sm">
            <h3 className="font-bold mb-2">Video Debugger</h3>
            <div className="space-y-2">
                <p><strong>Video ID:</strong> {videoId}</p>
                <p><strong>Video URL:</strong> {videoUrl}</p>

                <div className="flex space-x-2">
                    <button
                        onClick={testVideoUrl}
                        disabled={loading}
                        className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded text-xs"
                    >
                        {loading ? 'Testing...' : 'Test URL'}
                    </button>
                    <button
                        onClick={openInNewTab}
                        className="bg-green-500 hover:bg-green-600 px-3 py-1 rounded text-xs"
                    >
                        Open in New Tab
                    </button>
                </div>

                {testResult && (
                    <div className="mt-3 p-2 bg-gray-700 rounded">
                        <h4 className="font-semibold">Test Results:</h4>
                        <pre className="text-xs overflow-auto">
                            {JSON.stringify(testResult, null, 2)}
                        </pre>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VideoDebugger; 