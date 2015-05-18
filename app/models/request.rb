class Request < ActiveRecord::Base
  STATUS_STATES = %w(Approved Denied Pending)

  validates :listing_id, :requestor_id, :start_date, :end_date, :status,
    presence: true
  validates :status, inclusion: STATUS_STATES
  validate :start_must_come_before_end

  belongs_to :listing
  belongs_to :requestor, class_name: "User"

  def approve!
    # raise "Not pending" unless pending?
    transaction do
      self.status = "Approved"
      self.save!

      all_other_requests.update_all(status: "Denied")
    end
  end

  def deny!
    self.status = "Denied"
    self.save!
  end

  def approved?
    self.status == "Approved"
  end

  def denied?
    self.status == "Denied"
  end

  def pending?
    self.status == "Pending"
  end

  def all_other_requests
    Request.where("(:id IS NULL) OR (id != :id)", id: self.id)
      .where(listing_id: listing_id)
  end

  def start_must_come_before_end
    return unless start_date && end_date
    errors[:start_date] << "must come before end date" if start_date > end_date
  end
end
