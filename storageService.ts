import { Ticket, User, TicketStatus, TicketPriority, UserRole } from '../types';

// Initial Mock Data
export const INITIAL_USERS: User[] = [
  { id: 'u1', name: 'Moe Admin', email: 'moe@plc.com', role: UserRole.ADMIN, avatar: 'https://ui-avatars.com/api/?name=Moe+Admin&background=0284c7&color=fff', password: 'admin' },
  { id: 'u2', name: 'Sarah Developer', email: 'sarah@plc.com', role: UserRole.DEVELOPER, avatar: 'https://ui-avatars.com/api/?name=Sarah+Dev&background=7c3aed&color=fff', password: 'dev' },
  { id: 'u3', name: 'Mike Backend', email: 'mike@plc.com', role: UserRole.DEVELOPER, avatar: 'https://ui-avatars.com/api/?name=Mike+Back&background=7c3aed&color=fff', password: 'dev' },
  { id: 'u4', name: 'John Reporter', email: 'john@plc.com', role: UserRole.REPORTER, avatar: 'https://ui-avatars.com/api/?name=John+Rep&background=ea580c&color=fff', password: 'user' },
  { id: 'u5', name: 'Emily QA', email: 'emily@plc.com', role: UserRole.REPORTER, avatar: 'https://ui-avatars.com/api/?name=Emily+QA&background=ea580c&color=fff', password: 'user' },
];

export const INITIAL_TICKETS: Ticket[] = [
  {
    id: 't1',
    number: 'TIC-1001',
    title: 'Inventory Sync Failure',
    description: 'The inventory levels in the warehouse module are not syncing with the sales module. This is causing overselling of items.',
    module: 'Inventory',
    status: TicketStatus.OPEN_BUG,
    priority: TicketPriority.CRITICAL,
    reporterId: 'u4',
    assigneeId: 'u2',
    createdAt: new Date(Date.now() - 86400000 * 2), // 2 days ago
    updatedAt: new Date(Date.now() - 3600000),
    stepsToReproduce: '1. Go to Warehouse.\n2. Adjust stock for Item A.\n3. Check Sales module for Item A.\n4. Stock mismatch.',
    attachments: [
      { id: 'a1', name: 'error_log.png', type: 'image', url: 'https://picsum.photos/seed/error/400/300', mimeType: 'image/png' }
    ],
    comments: [],
    relations: []
  },
  {
    id: 't2',
    number: 'TIC-1002',
    title: 'Invoice Footer Formatting',
    description: 'PDF invoices are cutting off the footer information on A4 paper settings.',
    module: 'Finance',
    status: TicketStatus.RESOLVED,
    priority: TicketPriority.MEDIUM,
    reporterId: 'u5',
    assigneeId: 'u3',
    createdAt: new Date(Date.now() - 86400000 * 5),
    updatedAt: new Date(Date.now() - 86400000),
    stepsToReproduce: 'Print any invoice to PDF using default settings.',
    attachments: [],
    comments: [
        { id: 'c1', userId: 'u3', text: 'Fixed the template padding.', timestamp: new Date(), isResolution: true }
    ],
    relations: [],
    satisfactionRating: 5
  },
  {
    id: 't3',
    number: 'TIC-1003',
    title: 'Month End Closing Slow',
    description: 'The "Close Month" procedure is timing out after 30 minutes. Users cannot finalize the period.',
    module: 'Finance',
    status: TicketStatus.TO_BE_INVESTIGATED,
    priority: TicketPriority.HIGH,
    reporterId: 'u1',
    assigneeId: 'u2',
    createdAt: new Date(Date.now() - 43200000), // 12 hours ago
    updatedAt: new Date(Date.now() - 43200000),
    stepsToReproduce: 'Run "Month End" for September.',
    attachments: [],
    comments: [],
    relations: []
  },
  {
    id: 't4',
    number: 'TIC-1004',
    title: 'Payroll Tax Calculation Error',
    description: 'Deductions for tax bracket B are off by 0.5%. Verified with manual calculation.',
    module: 'HR',
    status: TicketStatus.OPEN_BUG,
    priority: TicketPriority.CRITICAL,
    reporterId: 'u5',
    assigneeId: 'u3',
    createdAt: new Date(Date.now() - 172800000), // 2 days
    updatedAt: new Date(),
    stepsToReproduce: 'Calculate payroll for Employee #105.',
    attachments: [],
    comments: [],
    relations: []
  },
  {
    id: 't5',
    number: 'TIC-1005',
    title: 'Dark Mode UI Glitch',
    description: 'The sidebar text becomes invisible in Dark Mode on Safari.',
    module: 'System',
    status: TicketStatus.PARTIALLY_CLOSED,
    priority: TicketPriority.LOW,
    reporterId: 'u4',
    assigneeId: 'u2',
    createdAt: new Date(Date.now() - 604800000), // 1 week
    updatedAt: new Date(),
    stepsToReproduce: 'Enable Dark Mode in Safari browser.',
    attachments: [],
    comments: [{ id: 'c2', userId: 'u2', text: 'Fixed for Chrome, still working on Safari.', timestamp: new Date(), isSystem: false }],
    relations: [],
    satisfactionRating: 3
  },
  {
    id: 't6',
    number: 'TIC-1006',
    title: 'Cannot Post Purchase Order',
    description: 'Error "Sequence boundary reached" when trying to post PO #5592.',
    module: 'Manufacturing',
    status: TicketStatus.PENDING_USER,
    priority: TicketPriority.MEDIUM,
    reporterId: 'u4',
    assigneeId: 'u3',
    createdAt: new Date(Date.now() - 10000000),
    updatedAt: new Date(),
    stepsToReproduce: 'Try to post PO #5592',
    attachments: [],
    comments: [{ id: 'c3', userId: 'u3', text: 'Can you provide a screenshot of the error dialog?', timestamp: new Date(), isSystem: false }],
    relations: []
  },
  {
    id: 't7',
    number: 'TIC-1007',
    title: 'New User Rights Request',
    description: 'Please add "Sales Manager" role to new employee John Doe.',
    module: 'System',
    status: TicketStatus.CLOSED,
    priority: TicketPriority.LOW,
    reporterId: 'u1',
    assigneeId: 'u1',
    createdAt: new Date(Date.now() - 250000000),
    updatedAt: new Date(Date.now() - 200000000),
    stepsToReproduce: 'N/A',
    attachments: [],
    comments: [],
    relations: [],
    satisfactionRating: 5
  },
  {
    id: 't8',
    number: 'TIC-1008',
    title: 'API Connection Timeout',
    description: 'The connection to the external logistics provider API is failing intermittently.',
    module: 'System',
    status: TicketStatus.IN_PROGRESS,
    priority: TicketPriority.HIGH,
    reporterId: 'u2',
    assigneeId: 'u3',
    createdAt: new Date(Date.now() - 3600000 * 4),
    updatedAt: new Date(),
    stepsToReproduce: 'Check API logs.',
    attachments: [],
    comments: [],
    relations: []
  },
  {
    id: 't9',
    number: 'TIC-1009',
    title: 'Customer Report Upgrade',
    description: 'Request to add "Last Purchase Date" column to the Customer Sales Report.',
    module: 'Sales',
    status: TicketStatus.USER_ACCEPTANCE,
    priority: TicketPriority.MEDIUM,
    reporterId: 'u5',
    assigneeId: 'u2',
    createdAt: new Date(Date.now() - 86400000 * 3),
    updatedAt: new Date(),
    stepsToReproduce: 'N/A',
    attachments: [],
    comments: [{ id: 'c4', userId: 'u2', text: 'Deployed to UAT environment. Please verify.', timestamp: new Date(), isResolution: false }],
    relations: [],
    satisfactionRating: 4
  },
  {
    id: 't10',
    number: 'TIC-1010',
    title: 'Re-opened: Login Issue',
    description: 'The fix for the login timeout worked for a day but is happening again.',
    module: 'System',
    status: TicketStatus.REOPENED,
    priority: TicketPriority.HIGH,
    reporterId: 'u4',
    assigneeId: 'u3',
    createdAt: new Date(Date.now() - 86400000 * 10),
    updatedAt: new Date(),
    stepsToReproduce: 'Wait 15 mins on login screen.',
    attachments: [],
    comments: [],
    relations: []
  },
  {
    id: 't11',
    number: 'TIC-1011',
    title: 'Stock Valuation Discrepancy',
    description: 'FIFO calculation seems incorrect for batch B-102.',
    module: 'Finance',
    status: TicketStatus.TO_BE_INVESTIGATED,
    priority: TicketPriority.CRITICAL,
    reporterId: 'u1',
    assigneeId: undefined,
    createdAt: new Date(Date.now() - 7200000),
    updatedAt: new Date(),
    stepsToReproduce: 'Run valuation report.',
    attachments: [],
    comments: [],
    relations: []
  },
  {
    id: 't12',
    number: 'TIC-1012',
    title: 'Add "Export to Excel" Button',
    description: 'Users need to export the order list to Excel.',
    module: 'Sales',
    status: TicketStatus.OPEN,
    priority: TicketPriority.LOW,
    reporterId: 'u5',
    assigneeId: undefined,
    createdAt: new Date(Date.now() - 1000000),
    updatedAt: new Date(),
    stepsToReproduce: 'N/A',
    attachments: [],
    comments: [],
    relations: []
  }
];

const STORAGE_KEYS = {
  TICKETS: 'plc_tickets',
  USERS: 'plc_users',
  CONFIG: 'plc_config'
};

export const StorageService = {
  // Load initial data (Local Storage or Mock)
  loadTickets: (): Ticket[] => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TICKETS);
      if (saved) {
        // Revive dates
        return JSON.parse(saved, (key, value) => {
          if (key === 'createdAt' || key === 'updatedAt' || key === 'timestamp') return new Date(value);
          return value;
        });
      }
    } catch (e) {
      console.error('Failed to parse tickets from storage', e);
    }
    return INITIAL_TICKETS;
  },

  loadUsers: (): User[] => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USERS);
      // If no users in local storage, return the INITIAL_USERS which now has 5 users
      if (!saved || JSON.parse(saved).length === 0) {
          return INITIAL_USERS;
      }
      return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse users from storage', e);
      return INITIAL_USERS;
    }
  },

  saveTickets: (tickets: Ticket[]) => {
    try {
      localStorage.setItem(STORAGE_KEYS.TICKETS, JSON.stringify(tickets));
    } catch (e) {
      console.error('Failed to save tickets to storage', e);
    }
  },

  saveUsers: (users: User[]) => {
    try {
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    } catch (e) {
      console.error('Failed to save users to storage', e);
    }
  },

  getGoogleSheetUrl: (): string | null => {
    return localStorage.getItem('google_sheet_url');
  },

  setGoogleSheetUrl: (url: string) => {
    if (url) localStorage.setItem('google_sheet_url', url);
    else localStorage.removeItem('google_sheet_url');
  },

  // --- GOOGLE SHEETS SYNC LOGIC ---
  syncWithGoogleSheets: async (localTickets: Ticket[], localUsers: User[]): Promise<{tickets: Ticket[], users: User[], success: boolean}> => {
    const url = StorageService.getGoogleSheetUrl();
    if (!url) return { tickets: localTickets, users: localUsers, success: false };

    try {
        const payload = {
            action: 'sync',
            tickets: localTickets,
            users: localUsers,
            lastSync: new Date().toISOString()
        };

        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(payload)
        });

        const data = await response.json();
        
        if (data && data.tickets) {
            const cloudTickets = data.tickets.map((t: any) => ({
                ...t,
                createdAt: new Date(t.createdAt),
                updatedAt: new Date(t.updatedAt),
                comments: t.comments.map((c: any) => ({ ...c, timestamp: new Date(c.timestamp) }))
            }));
            
            StorageService.saveTickets(cloudTickets);
            if (data.users) StorageService.saveUsers(data.users);

            return { tickets: cloudTickets, users: data.users || localUsers, success: true };
        }
        
        return { tickets: localTickets, users: localUsers, success: false };

    } catch (error) {
        console.error("Google Sheets Sync Error:", error);
        return { tickets: localTickets, users: localUsers, success: false };
    }
  }
};