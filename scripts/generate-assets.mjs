import fs from 'fs'
import path from 'path'

const projects = [
  { file: 'student-performance.svg', title: 'Student Performance', color: '#8B5CF6' },
  { file: 'churn-prediction.svg', title: 'Churn Prediction', color: '#00E5FF' },
  { file: 'loan-prediction.svg', title: 'Loan Prediction', color: '#22C55E' },
  { file: 'house-price.svg', title: 'House Price', color: '#F59E0B' },
  { file: 'spam-detection.svg', title: 'Spam Detection', color: '#EF4444' },
  { file: 'heart-disease.svg', title: 'Heart Disease', color: '#EC4899' },
  { file: 'fake-news.svg', title: 'Fake News', color: '#6366F1' },
  { file: 'portfolio.svg', title: 'Portfolio', color: '#8B5CF6' },
]

const certs = [
  { file: 'ml-cert.svg', title: 'Machine Learning', org: 'Coursera' },
  { file: 'dl-cert.svg', title: 'Deep Learning', org: 'DeepLearning.AI' },
  { file: 'python-cert.svg', title: 'Python Data Science', org: 'IBM' },
  { file: 'web-cert.svg', title: 'Full Stack Web Dev', org: 'Meta' },
  { file: 'tf-cert.svg', title: 'TensorFlow Developer', org: 'Google' },
]

function svg(title, color, subtitle = '') {
  const sub = subtitle
    ? `<text x="200" y="185" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#A1A1AA">${subtitle}</text>`
    : ''
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 225" fill="none">
  <rect width="400" height="225" fill="#050816"/>
  <rect x="20" y="20" width="360" height="185" rx="12" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)"/>
  <circle cx="200" cy="90" r="40" fill="${color}" opacity="0.2"/>
  <circle cx="200" cy="90" r="25" fill="${color}" opacity="0.4"/>
  <text x="200" y="160" text-anchor="middle" font-family="system-ui,sans-serif" font-size="16" font-weight="600" fill="#FFFFFF">${title}</text>
  ${sub}
  <circle cx="50" cy="50" r="2" fill="#00E5FF" opacity="0.5"/>
  <circle cx="350" cy="180" r="3" fill="#8B5CF6" opacity="0.4"/>
</svg>`
}

fs.mkdirSync('public/projects', { recursive: true })
fs.mkdirSync('public/certificates', { recursive: true })

projects.forEach((p) =>
  fs.writeFileSync(path.join('public/projects', p.file), svg(p.title, p.color))
)
certs.forEach((c) =>
  fs.writeFileSync(path.join('public/certificates', c.file), svg(c.title, '#8B5CF6', c.org))
)

console.log('Assets created')
