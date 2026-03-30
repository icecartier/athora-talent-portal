export const creator = {
  name: "Jordan",
  handle: "@jordanfitlife",
  niche: "Fitness",
  platform: "Instagram",
  tier: "Rising",
  tierLevel: 2,
  joinDate: "January 10, 2025",
  avatarInitials: "JF"
}

export const growth = {
  followers: 12400,
  followerChange7d: 340,
  followerChange30d: 1200,
  avgViews: 8200,
  avgEngagementRate: 4.7,
  postsThisMonth: 14,
  profileVisits7d: 3840,
  linkClicks7d: 218
}

export const todaysTasks = [
  { id: 1, task: "Post your Monday POV hook video", done: false, priority: "high", importance: 3 },
  { id: 2, task: "Reply to top 10 comments from weekend posts", done: true, priority: "medium", importance: 2 },
  { id: 3, task: "Film B-roll for Wednesday's carousel", done: false, priority: "medium", importance: 2 },
  { id: 4, task: "Review this week's content plan in Growth Plan", done: false, priority: "low", importance: 1 }
]

export const insight = {
  headline: "POV format is outperforming your other content by 2.1x",
  detail: "Your last 4 POV videos averaged 11.3k views vs 5.4k for talking-head format. Double down this week.",
  tag: "Format Insight"
}

export const contentSuggestions = [
  {
    id: 1,
    type: "Hook",
    format: "POV Video",
    title: "POV: You've been training wrong for 3 years",
    why: "High-search intent. POV format is your current strongest performer.",
    difficulty: "Easy",
    estimatedPerformance: "Very High",
    platform: "Instagram Reels"
  },
  {
    id: 2,
    type: "Carousel",
    format: "Educational",
    title: "5 mistakes killing your gains (with fixes)",
    why: "Educational saves drive profile visits. Strong for follower conversion.",
    difficulty: "Medium",
    estimatedPerformance: "High",
    platform: "Instagram Carousel"
  },
  {
    id: 3,
    type: "Reel",
    format: "Transformation",
    title: "30-day consistency challenge — day 1 vs day 30",
    why: "Transformation content generates shares. Builds social proof for brand readiness.",
    difficulty: "Easy",
    estimatedPerformance: "Very High",
    platform: "Instagram Reels"
  },
  {
    id: 4,
    type: "Story Series",
    format: "Behind the Scenes",
    title: "What I actually eat in a day (no filter)",
    why: "Authenticity content drives DMs and saves. Good for trust-building phase.",
    difficulty: "Easy",
    estimatedPerformance: "Medium",
    platform: "Instagram Stories"
  },
  {
    id: 5,
    type: "Hook",
    format: "Talking Head",
    title: "The fitness advice I wish someone told me at 18",
    why: "Nostalgia + advice format performs well with your 18-34 male demographic.",
    difficulty: "Easy",
    estimatedPerformance: "High",
    platform: "Instagram Reels"
  }
]

export const hookFormulas = [
  { id: 1, formula: "POV: [Relatable situation that went wrong]", example: "POV: You followed bro science for 2 years", tag: "POV" },
  { id: 2, formula: "The [number] [thing] nobody talks about", example: "The 3 exercises nobody talks about for chest", tag: "Education" },
  { id: 3, formula: "Stop [common behavior] if you want [desired result]", example: "Stop doing cardio if you want to actually lose fat", tag: "Pattern Interrupt" },
  { id: 4, formula: "I tried [thing] for [time]. Here's what happened.", example: "I trained fasted for 30 days. Here's what happened.", tag: "Experiment" },
  { id: 5, formula: "What [authority] doesn't want you to know about [topic]", example: "What gyms don't want you to know about supplements", tag: "Controversy" }
]

export const dailyViewHistory = [
  { day: "Mar 16", views: 3200 },
  { day: "Mar 17", views: 7800 },
  { day: "Mar 18", views: 4100 },
  { day: "Mar 19", views: 5900 },
  { day: "Mar 20", views: 4300 },
  { day: "Mar 21", views: 9200 },
  { day: "Mar 22", views: 3600 },
  { day: "Mar 23", views: 4800 },
  { day: "Mar 24", views: 8400 },
  { day: "Mar 25", views: 5100 },
  { day: "Mar 26", views: 6300 },
  { day: "Mar 27", views: 4700 },
  { day: "Mar 28", views: 11300 },
  { day: "Mar 29", views: 6800 },
]

export const recentPosts = [
  { id: 1, type: 'Reel',     format: 'POV',        title: "POV: You've been training wrong for 3 years",     date: 'Mar 28', views: 11300, engagement: 6.2, trend: 'up',   coreNote: 'Best POV performance to date — hook landed in the first 2 seconds. High completion rate drove the reach spike.' },
  { id: 2, type: 'Carousel', format: 'Educational', title: '5 mistakes killing your gains (with fixes)',       date: 'Mar 25', views: 8400,  engagement: 5.1, trend: 'up',   coreNote: 'Save rate 3.2× above your average. Educational carousels are your strongest profile-visit driver.' },
  { id: 3, type: 'Reel',     format: 'Experiment',  title: 'I trained fasted for 30 days — here\'s what happened', date: 'Mar 21', views: 9200, engagement: 4.8, trend: 'up',  coreNote: 'Experiment format above average. Shares drove ~40% of reach — this format has strong discovery potential.' },
  { id: 4, type: 'Reel',     format: 'Talking Head', title: 'Morning routine that changed my physique',       date: 'Mar 18', views: 4100,  engagement: 3.2, trend: 'down', coreNote: 'Talking-head underperforming vs your POV content by 63%. Consider switching to POV framing for this topic.' },
  { id: 5, type: 'Story',    format: 'BTS',          title: 'Behind the scenes — how I plan my training week', date: 'Mar 17', views: 7800,  engagement: 4.9, trend: 'up',   coreNote: 'Story engagement high. Authenticity content drives DMs and trust — keep this in your weekly mix.' },
]

export const performanceHistory = [
  { week: "Jan W3", views: 5200, engagement: 3.8, followers: 11060 },
  { week: "Jan W4", views: 6100, engagement: 4.1, followers: 11280 },
  { week: "Feb W1", views: 7400, engagement: 4.3, followers: 11540 },
  { week: "Feb W2", views: 6800, engagement: 4.0, followers: 11700 },
  { week: "Feb W3", views: 8200, engagement: 4.5, followers: 12050 },
  { week: "Feb W4", views: 9100, engagement: 4.7, followers: 12400 },
  { week: "Mar W1", views: 11300, engagement: 5.2, followers: 12400 }
]

export const contentBreakdown = [
  { format: "POV Video", avgViews: 11300, count: 4, trend: "up" },
  { format: "Carousel", avgViews: 7200, count: 5, trend: "up" },
  { format: "Talking Head", avgViews: 5400, count: 8, trend: "flat" },
  { format: "Story Series", avgViews: 3100, count: 6, trend: "up" },
  { format: "Transformation", avgViews: 9800, count: 2, trend: "up" }
]

export const performanceInsights = [
  {
    id: 1,
    type: "pattern",
    headline: "POV content outperforms all other formats",
    detail: "11.3k avg views vs 5.4k overall average. This is your breakout format.",
    action: "Increase POV frequency to 2x per week.",
    impact: "High"
  },
  {
    id: 2,
    type: "timing",
    headline: "Monday and Friday posts get 34% more reach",
    detail: "Based on your last 14 posts, Mon/Fri consistently outperform mid-week.",
    action: "Anchor your best content to Mon and Fri slots.",
    impact: "Medium"
  },
  {
    id: 3,
    type: "audience",
    headline: "Educational carousels drive the most profile visits",
    detail: "Carousel saves convert to profile visits at 3.2x the rate of Reels.",
    action: "Post 1 educational carousel per week minimum.",
    impact: "Medium"
  }
]

export const growthPlan = {
  weeklyTarget: "4 posts per week",
  bestDays: ["Monday", "Wednesday", "Friday", "Sunday"],
  currentPhase: "Phase 2 — Format Dominance",
  phaseDescription: "Double down on POV and transformation content to accelerate follower growth before brand outreach begins.",
  contentMix: [
    { type: "POV Hooks", percentage: 40, color: "var(--theme-accent)" },
    { type: "Educational Carousels", percentage: 30, color: "var(--theme-accent-2)" },
    { type: "Transformation/Progress", percentage: 20, color: "#F59E0B" },
    { type: "Behind the Scenes", percentage: 10, color: "#8B8FA8" }
  ],
  weeklySchedule: [
    {
      day: "Monday", content: "POV Hook Reel", priority: "high",
      entries: [
        { type: "Reel",    title: "POV Hook Reel",                   priority: "high",   importance: 3 },
        { type: "Task",    title: "Reply to top 10 comments",         priority: "medium", importance: 2 },
        { type: "Task",    title: "Check analytics from Sunday post", priority: "low",    importance: 1 },
      ]
    },
    {
      day: "Tuesday", content: "Story Series (BTS)", priority: "low",
      entries: [
        { type: "Story",   title: "Behind the scenes — morning workout", priority: "low",    importance: 1 },
        { type: "Task",    title: "Film B-roll for Wednesday carousel",  priority: "medium", importance: 2 },
      ]
    },
    {
      day: "Wednesday", content: "Educational Carousel", priority: "high",
      entries: [
        { type: "Carousel", title: "5 mistakes killing your gains",  priority: "high",   importance: 3 },
        { type: "Task",     title: "Engage with similar creators",   priority: "medium", importance: 2 },
        { type: "Task",     title: "Plan Friday reel concept",       priority: "low",    importance: 1 },
      ]
    },
    {
      day: "Thursday", content: "Engage only — no post", priority: "none",
      entries: [
        { type: "Task", title: "Respond to DMs & story replies", priority: "medium", importance: 2 },
        { type: "Task", title: "Review weekly stats",            priority: "low",    importance: 1 },
      ]
    },
    {
      day: "Friday", content: "Transformation or Experiment Reel", priority: "high",
      entries: [
        { type: "Reel",  title: "Transformation — 30-day progress",  priority: "high",   importance: 3 },
        { type: "Story", title: "Post-upload story CTA",             priority: "medium", importance: 2 },
        { type: "Task",  title: "Reply to first 30 min comments",    priority: "high",   importance: 3 },
      ]
    },
    {
      day: "Saturday", content: "Story Q&A or Poll", priority: "low",
      entries: [
        { type: "Story", title: "Q&A — ask me anything",           priority: "low",    importance: 1 },
        { type: "Task",  title: "Batch-film content for next week", priority: "medium", importance: 2 },
      ]
    },
    {
      day: "Sunday", content: "Motivational / Recap content", priority: "medium",
      entries: [
        { type: "Reel", title: "Motivational recap — week wins",   priority: "medium", importance: 2 },
        { type: "Task", title: "Plan next week's schedule",        priority: "high",   importance: 3 },
        { type: "Task", title: "Check growth plan milestones",     priority: "low",    importance: 1 },
      ]
    }
  ],
  milestones: [
    { label: "Joined Athora", value: "11k", reached: true },
    { label: "Rising Tier", value: "12k", reached: true },
    { label: "Brand Ready", value: "15k", reached: false },
    { label: "Partner Tier", value: "25k", reached: false }
  ],
  currentFollowers: 12400,
  nextMilestone: 15000,
  nextMilestoneLabel: "Brand Ready"
}

export const opportunities = {
  locked: true,
  unlockAt: 15000,
  unlockLabel: "15k followers",
  currentFollowers: 12400,
  progressPercent: 82,
  message: "You're 2,600 followers away from unlocking brand opportunities.",
  subMessage: "Keep executing the Growth Plan. MATCH will surface the right brands once you're ready.",
  previewOpportunities: [
    {
      id: 1,
      brand: "Apex Nutrition",
      category: "Supplements",
      type: "Sponsored Reel",
      payout: "$400–$600",
      requirements: "15k+ followers, fitness niche, 4%+ engagement",
      blurred: true
    },
    {
      id: 2,
      brand: "FormFit Apparel",
      category: "Fitness Wear",
      type: "3-Post Campaign",
      payout: "$900–$1,200",
      requirements: "15k+ followers, US audience, transformation content",
      blurred: true
    }
  ]
}

export const profile = {
  niche: "Fitness",
  contentStyles: ["POV", "Educational", "Transformation", "Behind the Scenes"],
  platforms: [{ name: "Instagram", handle: "@jordanfitlife", followers: 12400 }],
  audienceDemographic: "18–34, 68% male, United States",
  avgEngagementRate: 4.7,
  avgViews: 8200,
  matchReadiness: 62,
  matchReadinessLabel: "Rising",
  strengths: ["High engagement rate", "Strong POV format performance", "Consistent posting cadence"],
  areasToImprove: ["Follower count (target 15k)", "Content variety", "Brand-friendly content ratio"],
  athoraScore: 71,
  bio: "Fitness creator helping everyday people train smarter. No BS, just results."
}
