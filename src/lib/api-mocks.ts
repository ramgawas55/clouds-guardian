export const MOCK_API = {
    get: async (endpoint: string) => {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));

        switch (endpoint) {
            case 'scan-status':
                return { lastScanTime: new Date(Date.now() - 3600000).toISOString() };
            case 'aws-dashboard':
                return {
                    totalResources: 1248,
                    activeLeaks: 14,
                    potentialSavings: 8450.00,
                    securityRiskScore: 68,
                    recentAlerts: [
                        { id: '1', severity: 'high', message: 'S3 bucket "prod-backups" is publicly readable', time: '10m ago' },
                        { id: '2', severity: 'medium', message: 'Unused EC2 instance detected', time: '1h ago' },
                        { id: '3', severity: 'medium', message: 'IAM user lacks MFA', time: '2h ago' },
                    ]
                };
            case 'aws-resources':
                return {
                    resources: [
                        { id: 'i-0abcd1234', type: 'EC2', region: 'us-east-1', status: 'running', cost: 124.50 },
                        { id: 'prod-db', type: 'RDS', region: 'us-east-1', status: 'available', cost: 450.00 },
                        { id: 'assets-bucket', type: 'S3', region: 'us-west-2', status: 'active', cost: 12.00 },
                    ]
                };
            case 'aws-leaks':
                return {
                    leaks: [
                        { id: 'leak-1', type: 's3', resource: 'prod-backups', severity: 'critical', status: 'open', detectedAt: new Date().toISOString() },
                        { id: 'leak-2', type: 'iam', resource: 'dev-key', severity: 'high', status: 'open', detectedAt: new Date().toISOString() },
                    ]
                };
            case 'aws-recommendations':
                return {
                    recommendations: [
                        { id: 'rec-1', type: 'cost', title: 'Downsize EC2 Instances', description: '3 instances have < 10% CPU usage', impact: '$120/mo' },
                        { id: 'rec-2', type: 'security', title: 'Enable S3 Block Public Access', description: '2 buckets have public ACLs', impact: 'High' },
                    ]
                };
            case 'aws-kubernetes':
                return {
                    clusters: [
                        { name: 'prod-eks', version: '1.27', nodes: 12, podCount: 145, status: 'healthy' }
                    ]
                };
            case 'aws-reports':
                return {
                    reports: [
                        { name: 'Monthly Security Audit', date: new Date().toISOString(), type: 'Security' },
                        { name: 'Cost Optimization Q3', date: new Date().toISOString(), type: 'Cost' }
                    ]
                };
            case 'teams':
                return {
                    members: [
                        { id: '1', name: 'Admin User', email: 'admin@cloudguardian.io', role: 'admin', status: 'active' }
                    ]
                };
            case 'integrations':
                return [
                    { id: 'aws', name: 'AWS', isConnected: true, status: 'Active' }
                ];
            case 'user-settings':
                return {
                    notifications: { email: true, push: false, weeklyReport: true },
                    theme: 'dark'
                };
            case 'notifications':
                return [
                    { id: 'notif-1', message: 'AWS Account sync completed', read: false },
                    { id: 'notif-2', message: 'New security alert generated', read: false }
                ];
            default:
                return {};
        }
    },
    post: async (endpoint: string, data: any) => {
        await new Promise(resolve => setTimeout(resolve, 500));
        return { success: true };
    }
};
