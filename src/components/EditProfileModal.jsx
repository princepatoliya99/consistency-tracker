import { useState } from 'react'

function EditProfileModal({ isOpen, onClose, profileData, onSave }) {
  const [formData, setFormData] = useState({
    fullName: profileData?.fullName || '',
    email: profileData?.email || '',
    mobile: profileData?.mobile || '',
    age: profileData?.age || '',
    gender: profileData?.gender || '',
    country: profileData?.country || '',
    city: profileData?.city || '',
    bio: profileData?.bio || ''
  })

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }
    
    if (formData.mobile && !/^\+?[\d\s-()]+$/.test(formData.mobile)) {
      newErrors.mobile = 'Mobile number format is invalid'
    }
    
    if (formData.age && (isNaN(formData.age) || formData.age < 13 || formData.age > 120)) {
      newErrors.age = 'Age must be between 13 and 120'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      onSave(formData)
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="edit-profile-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Edit Profile Information</h2>
          <button className="modal-close-btn" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="edit-profile-form">
          <div className="form-scroll-container">
            {/* Full Name */}
            <div className="form-group">
              <label htmlFor="fullName" className="form-label">
                Full Name <span className="required-star">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className={`form-input ${errors.fullName ? 'error' : ''}`}
                placeholder="Enter your full name"
              />
              {errors.fullName && <span className="error-message">{errors.fullName}</span>}
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email Address <span className="required-star">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`form-input ${errors.email ? 'error' : ''}`}
                placeholder="your.email@example.com"
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            {/* Mobile */}
            <div className="form-group">
              <label htmlFor="mobile" className="form-label">
                Mobile Number
              </label>
              <input
                type="tel"
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className={`form-input ${errors.mobile ? 'error' : ''}`}
                placeholder="+1 (555) 123-4567"
              />
              {errors.mobile && <span className="error-message">{errors.mobile}</span>}
            </div>

            {/* Age and Gender Row */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="age" className="form-label">
                  Age
                </label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className={`form-input ${errors.age ? 'error' : ''}`}
                  placeholder="25"
                  min="13"
                  max="120"
                />
                {errors.age && <span className="error-message">{errors.age}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="gender" className="form-label">
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="form-input"
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="non-binary">Non-binary</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
              </div>
            </div>

            {/* Country and City Row */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="country" className="form-label">
                  Country
                </label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="United States"
                />
              </div>

              <div className="form-group">
                <label htmlFor="city" className="form-label">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="New York"
                />
              </div>
            </div>

            {/* Bio */}
            <div className="form-group">
              <label htmlFor="bio" className="form-label">
                Bio / Status
              </label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                className="form-textarea"
                placeholder="Building consistency one day at a time 💪"
                rows="3"
              />
              <span className="field-hint">{formData.bio.length}/150 characters</span>
            </div>
          </div>

          {/* Modal Actions */}
          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditProfileModal
