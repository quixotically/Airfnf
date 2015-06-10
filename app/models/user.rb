class User < ActiveRecord::Base
  attr_reader :password
  has_attached_file :avatar, styles: { medium: "300x300>", thumb:
    "100x100>" }, default_url: "cat.jpg"
  validates_attachment_content_type :avatar, content_type: /\Aimage\/.*\Z/

  validates :username, :email, :password_digest, :session_token, presence: true
  validates :username, :email, :session_token, uniqueness: true
  validates :password, length: { minimum: 6, allow_nil: true }

  has_many :listings, foreign_key: :owner_id
  has_many :requests, foreign_key: :requestor_id

  after_initialize :ensure_session_token

  def self.find_by_credentials(email, password)
    user = User.find_by(email: email)
    return nil if user.nil?
    user.is_password?(password) ? user : nil
  end
  #
  # def owns_listing?(listing)
  #   listing.owner_id == self.id
  # end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def reset_session_token!
    self.session_token = SecureRandom.urlsafe_base64(16)
    self.save!
    self.session_token
  end

  private

    def ensure_session_token
      self.session_token ||= SecureRandom.urlsafe_base64(16)
    end
end
