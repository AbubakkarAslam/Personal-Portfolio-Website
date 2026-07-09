import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaGithub,
  FaLinkedin,
  FaCheckCircle,
} from 'react-icons/fa'
import SectionTitle from '../ui/SectionTitle'
import { FadeIn } from '../ui/AnimatedSection'
import { personalInfo } from '../../data/personal'

const contactItems = [
  { icon: FaEnvelope, label: 'Email', value: personalInfo.email, href: `mailto:${personalInfo.email}` },
  { icon: FaPhone, label: 'Phone', value: personalInfo.phone, href: `tel:${personalInfo.phone.replace(/\s/g, '')}` },
  { icon: FaMapMarkerAlt, label: 'Location', value: personalInfo.location },
  { icon: FaGithub, label: 'GitHub', value: 'GitHub Profile', href: personalInfo.github },
  { icon: FaLinkedin, label: 'LinkedIn', value: 'LinkedIn Profile', href: personalInfo.linkedin },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)

  const validate = () => {
    const newErrors = {}
    if (!form.name.trim()) newErrors.name = 'Name is required'
    if (!form.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Invalid email address'
    }
    if (!form.subject.trim()) newErrors.subject = 'Subject is required'
    if (!form.message.trim()) newErrors.message = 'Message is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

const handleSubmit = async (e) => {
  e.preventDefault()

  if (!validate()) return

  setSending(true)

  const formData = {
    access_key: import.meta.env.VITE_WEB3FORMS_KEY,
    name: form.name,
    email: form.email,
    subject: form.subject,
    message: form.message,
  }

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formData),
    })

    const result = await response.json()

    console.log(result)

    if (result.success) {
      setSubmitted(true)

      setForm({
        name: "",
        email: "",
        subject: "",
        message: "",
      })

      setTimeout(() => setSubmitted(false), 5000)
    } else {
      alert(result.message)
      console.log(result)
    }
  } catch (error) {
    console.error(error)
    alert("Something went wrong.")
  }

  setSending(false)
}
  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  return (
    <section id="contact" className="relative section-padding" aria-labelledby="contact-heading">
      <div className="container-custom">
        <SectionTitle subtitle="Get In Touch" title="Let's Work Together" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <FadeIn direction="left">
            <div>
              <h3 id="contact-heading" className="font-display text-2xl font-bold text-white mb-4">
                Contact Information
              </h3>
              <p className="text-muted leading-relaxed mb-8">{personalInfo.contactMessage}</p>

              <ul className="space-y-5" role="list">
                {contactItems.map(({ icon: Icon, label, value, href }) => (
                  <li key={label} className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-xl glass-card flex items-center justify-center text-secondary group-hover:shadow-[0_0_20px_rgba(0,229,255,0.2)] transition-shadow">
                      <Icon />
                    </div>
                    <div>
                      <p className="text-muted text-xs uppercase tracking-wider">{label}</p>
                      {href ? (
                        <a
                          href={href}
                          target={href.startsWith('http') ? '_blank' : undefined}
                          rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="text-white hover:text-secondary transition-colors"
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="text-white">{value}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          <FadeIn direction="right" delay={0.2}>
            <form
              onSubmit={handleSubmit}
              className="glass-card rounded-2xl p-6 md:p-8 gradient-border"
              noValidate
              aria-label="Contact form"
            >
              {[
                { name: 'name', label: 'Name', type: 'text', placeholder: 'Your Name' },
                { name: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com' },
                { name: 'subject', label: 'Subject', type: 'text', placeholder: 'Project Inquiry' },
              ].map(({ name, label, type, placeholder }) => (
                <div key={name} className="mb-5">
                  <label htmlFor={name} className="block text-sm text-muted mb-2">
                    {label}
                  </label>
                  <input
                    type={type}
                    id={name}
                    name={name}
                    value={form[name]}
                    onChange={handleChange}
                    placeholder={placeholder}
                    className={`w-full px-4 py-3 rounded-xl bg-white/5 border ${
                      errors[name] ? 'border-red-500' : 'border-border'
                    } text-white placeholder:text-muted/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/50 transition-colors`}
                    aria-invalid={!!errors[name]}
                    aria-describedby={errors[name] ? `${name}-error` : undefined}
                  />
                  {errors[name] && (
                    <p id={`${name}-error`} className="text-red-400 text-xs mt-1" role="alert">
                      {errors[name]}
                    </p>
                  )}
                </div>
              ))}

              <div className="mb-6">
                <label htmlFor="message" className="block text-sm text-muted mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  rows={5}
                  className={`w-full px-4 py-3 rounded-xl bg-white/5 border ${
                    errors.message ? 'border-red-500' : 'border-border'
                  } text-white placeholder:text-muted/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/50 transition-colors resize-none`}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                />
                {errors.message && (
                  <p id="message-error" className="text-red-400 text-xs mt-1" role="alert">
                    {errors.message}
                  </p>
                )}
              </div>

              <motion.button
                type="submit"
                disabled={sending}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-semibold text-lg relative overflow-hidden group disabled:opacity-70"
                data-magnetic
                whileHover={{ boxShadow: '0 0 40px rgba(139,92,246,0.5)' }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {sending ? 'Sending...' : 'Send Message →'}
                </span>
              </motion.button>

              <AnimatePresence>
                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-4 flex items-center justify-center gap-2 text-accent"
                    role="status"
                  >
                    <FaCheckCircle />
                    <span>Message sent successfully!</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
