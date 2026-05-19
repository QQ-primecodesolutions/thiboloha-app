'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'

const schema = z.object({
  program: z.enum(['deaf', 'blind', 'autistic', 'intellectual', 'general'], {
    error: 'Please select a program or inquiry type',
  }),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().min(10, 'Enter a valid South African phone number'),
  email: z.string().email('Enter a valid email address').optional().or(z.literal('')),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type FormData = z.infer<typeof schema>

const programOptions = [
  { value: 'deaf', label: 'Deaf Learners Program' },
  { value: 'blind', label: 'Blind Learners Program' },
  { value: 'autistic', label: 'Autistic Learners Program' },
  { value: 'intellectual', label: 'Intellectual Barriers Program' },
  { value: 'general', label: 'General Inquiry' },
]

const STEPS = ['Program', 'Contact Details', 'Message'] as const

function formatSAPhone(raw: string): string {
  const digits = raw.replace(/\D/g, '')
  if (digits.startsWith('27') && digits.length >= 11) {
    return '+' + digits.replace(/(\d{2})(\d{2})(\d{3})(\d{4})/, '$1 $2 $3 $4')
  }
  if (digits.startsWith('0') && digits.length >= 10) {
    return digits.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')
  }
  return raw
}

export function ContactForm({ defaultProgram }: { defaultProgram?: string }) {
  const [step, setStep] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { program: (defaultProgram as FormData['program']) ?? undefined },
  })

  const selectedProgram = watch('program')

  async function next() {
    let valid = false
    if (step === 0) valid = await trigger('program')
    if (step === 1) valid = await trigger(['name', 'phone', 'email'])
    if (valid) setStep((s) => s + 1)
  }

  async function onSubmit(data: FormData) {
    setSubmitting(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Failed')
      setDone(true)
      toast.success('Message sent! We\'ll respond within 24 hours.')
    } catch {
      toast.error('Something went wrong. Please try calling (058) 713 0048.')
    } finally {
      setSubmitting(false)
    }
  }

  if (done) {
    return (
      <div className="text-center py-12">
        <div className="text-5xl mb-4">✅</div>
        <h3 className="text-2xl font-bold text-[#1e3a8a] mb-2">Message Sent!</h3>
        <p className="text-[#6c757d]">We'll respond within 24 hours during business days.</p>
      </div>
    )
  }

  return (
    <div suppressHydrationWarning>
      {/* Progress */}
      <div className="flex items-center gap-2 mb-8">
        {STEPS.map((label, i) => (
          <div key={label} className="flex items-center gap-2 flex-1">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                i < step
                  ? 'bg-green-500 text-white'
                  : i === step
                  ? 'bg-[#1e3a8a] text-white'
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              {i < step ? '✓' : i + 1}
            </div>
            <span className={`text-sm hidden sm:block ${i === step ? 'font-semibold text-[#1e3a8a]' : 'text-gray-500'}`}>
              {label}
            </span>
            {i < STEPS.length - 1 && <div className="flex-1 h-px bg-gray-200" />}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* Step 0: Program */}
        {step === 0 && (
          <div>
            <h3 className="font-semibold text-[#1e3a8a] mb-4 text-lg">What are you enquiring about?</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {programOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setValue('program', opt.value as FormData['program'])}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    selectedProgram === opt.value
                      ? 'border-[#1e3a8a] bg-blue-50 font-semibold text-[#1e3a8a]'
                      : 'border-gray-200 hover:border-gray-400'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            {errors.program && (
              <p className="text-red-500 text-sm mt-2">{errors.program.message}</p>
            )}
          </div>
        )}

        {/* Step 1: Contact info */}
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-[#1e3a8a] mb-4 text-lg">Your Contact Details</h3>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="name">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                {...register('name')}
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#1e3a8a] outline-none"
                placeholder="e.g. Thabo Mokoena"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="phone">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                id="phone"
                type="tel"
                {...register('phone')}
                onChange={(e) => {
                  const formatted = formatSAPhone(e.target.value)
                  setValue('phone', formatted)
                }}
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#1e3a8a] outline-none"
                placeholder="+27 58 713 0048"
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="email">
                Email Address <span className="text-gray-400">(optional)</span>
              </label>
              <input
                id="email"
                type="email"
                {...register('email')}
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#1e3a8a] outline-none"
                placeholder="you@example.com"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>
          </div>
        )}

        {/* Step 2: Message */}
        {step === 2 && (
          <div>
            <h3 className="font-semibold text-[#1e3a8a] mb-4 text-lg">Your Message</h3>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="message">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                {...register('message')}
                rows={5}
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#1e3a8a] outline-none resize-none"
                placeholder="Tell us about your child's needs, questions about admissions, or any other inquiry…"
              />
              {errors.message && (
                <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
              )}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          {step > 0 ? (
            <button
              type="button"
              onClick={() => setStep((s) => s - 1)}
              className="px-6 py-2 border-2 border-gray-300 text-gray-600 rounded-full hover:bg-gray-50 transition-colors"
            >
              Back
            </button>
          ) : (
            <span />
          )}

          {step < 2 ? (
            <button
              type="button"
              onClick={next}
              className="bg-[#1e3a8a] text-white font-semibold px-8 py-2 rounded-full hover:bg-blue-900 transition-colors"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              disabled={submitting}
              className="bg-[#f39c12] text-white font-semibold px-8 py-2 rounded-full hover:bg-orange-500 transition-colors disabled:opacity-60"
            >
              {submitting ? 'Sending…' : 'Send Message'}
            </button>
          )}
        </div>
      </form>
    </div>
  )
}
