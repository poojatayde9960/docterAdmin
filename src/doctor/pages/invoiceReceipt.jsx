import React from 'react';
import './InvoiceReceipt.css';

const InvoiceReceipt = () => {
    return (
        <div className="invoice-container">
            <div className="invoice-wrapper">
                {/* Header Section with Medical Graphics */}
                <div className="invoice-header">
                    <div className="medical-graphic syringe">
                        <svg width="80" height="80" viewBox="0 0 100 100">
                            <rect x="45" y="10" width="10" height="30" fill="#4A90E2" rx="2" />
                            <rect x="40" y="35" width="20" height="50" fill="#E8F4F8" stroke="#4A90E2" strokeWidth="2" rx="3" />
                            <circle cx="50" cy="60" r="8" fill="#E74C3C" />
                            <rect x="48" y="85" width="4" height="10" fill="#666" />
                        </svg>
                    </div>

                    <div className="medical-graphic microscope">
                        <svg width="80" height="80" viewBox="0 0 100 100">
                            <ellipse cx="50" cy="25" rx="15" ry="8" fill="#E8F4F8" stroke="#9B59B6" strokeWidth="2" />
                            <rect x="47" y="25" width="6" height="35" fill="#9B59B6" />
                            <ellipse cx="50" cy="60" rx="12" ry="6" fill="#E8F4F8" stroke="#9B59B6" strokeWidth="2" />
                            <rect x="30" y="70" width="40" height="4" fill="#9B59B6" />
                            <path d="M 45 60 L 35 70" stroke="#9B59B6" strokeWidth="3" />
                            <path d="M 55 60 L 65 70" stroke="#9B59B6" strokeWidth="3" />
                        </svg>
                    </div>

                    <div className="medical-graphic pills">
                        <svg width="80" height="80" viewBox="0 0 100 100">
                            <ellipse cx="40" cy="40" rx="12" ry="20" fill="#D4A574" transform="rotate(-45 40 40)" />
                            <path d="M 32 32 L 48 48" stroke="#8B6F47" strokeWidth="2" />
                            <ellipse cx="65" cy="55" rx="10" ry="18" fill="#CD853F" transform="rotate(30 65 55)" />
                            <line x1="58" y1="48" x2="72" y2="62" stroke="#8B6F47" strokeWidth="2" />
                        </svg>
                    </div>

                    <div className="medical-graphic molecules">
                        <svg width="120" height="80" viewBox="0 0 120 80">
                            <circle cx="30" cy="30" r="10" fill="#4A90E2" />
                            <circle cx="55" cy="25" r="8" fill="#5DADE2" />
                            <circle cx="75" cy="35" r="9" fill="#3498DB" />
                            <circle cx="95" cy="30" r="7" fill="#5DADE2" />
                            <circle cx="25" cy="55" r="8" fill="#5DADE2" />
                            <circle cx="50" cy="50" r="10" fill="#4A90E2" />
                            <circle cx="70" cy="60" r="8" fill="#3498DB" />
                            <circle cx="90" cy="55" r="9" fill="#5DADE2" />
                            <line x1="30" y1="30" x2="55" y2="25" stroke="#5DADE2" strokeWidth="2" />
                            <line x1="55" y1="25" x2="75" y2="35" stroke="#5DADE2" strokeWidth="2" />
                            <line x1="75" y1="35" x2="95" y2="30" stroke="#5DADE2" strokeWidth="2" />
                            <line x1="30" y1="30" x2="25" y2="55" stroke="#5DADE2" strokeWidth="2" />
                            <line x1="50" y1="50" x2="70" y2="60" stroke="#5DADE2" strokeWidth="2" />
                            <line x1="70" y1="60" x2="90" y2="55" stroke="#5DADE2" strokeWidth="2" />
                        </svg>
                    </div>
                </div>

                {/* Company Logo and Invoice Title */}
                <div className="invoice-content">
                    <div className="invoice-top">
                        <div className="company-info">
                            <div className="company-logo">
                                <div className="logo-icon">

                                </div>
                                <div className="company-name">
                                    <img src="/logo.png" alt="Tech Surya Logo" className="logo" />


                                </div>

                            </div>
                            <h1 className="invoice-title">Invoice</h1>
                            <div className="invoice-meta">
                                <div className="meta-row">
                                    <span className="meta-label">Number</span>
                                    <span className="meta-value">8653956</span>
                                </div>
                                <div className="meta-row">
                                    <span className="meta-label">Date</span>
                                    <span className="meta-value">20/10/2025</span>
                                </div>
                            </div>
                        </div>

                        <div className="billing-info">
                            <div className="bill-to-label">Bill To,</div>
                            <div className="patient-name">John Doe</div>
                            <div className="patient-address">Golden City Center ,</div>
                            <div className="patient-address">chhatarapal 431001</div>
                            <div className="patient-phone">+91 4444 855 858</div>
                        </div>
                    </div>

                    {/* Medicine Table */}
                    <div className="medicine-table">
                        <table>
                            <thead>
                                <tr>
                                    <th className="col-medicine">Medicine</th>
                                    <th className="col-qty">Qty</th>
                                    <th className="col-time">Time</th>
                                    <th className="col-price">Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="medicine-name">Metformin 500mg</td>
                                    <td className="quantity">1</td>
                                    <td className="timing">Morning : 0 | Afternoon : 1 | Night : 1</td>
                                    <td className="price">₹800</td>
                                </tr>
                                <tr>
                                    <td className="medicine-name">Metformin 500mg</td>
                                    <td className="quantity">1</td>
                                    <td className="timing">Morning : 0 | Afternoon : 1 | Night : 1</td>
                                    <td className="price">₹800</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Totals Section */}
                    <div className="totals-section">
                        <div className="total-row">
                            <span className="total-label">SUBTOTAL</span>
                            <span className="total-value">₹800</span>
                        </div>
                        <div className="total-row">
                            <span className="total-label">REPORT TOTAL</span>
                            <span className="total-value">₹0</span>
                        </div>
                        <div className="total-row report-item">
                            <span className="total-label">Blood report</span>
                            <span className="total-value">₹200</span>
                        </div>
                        <div className="total-row report-item">
                            <span className="total-label">Blood report</span>
                            <span className="total-value">₹200</span>
                        </div>
                        <div className="total-row report-item">
                            <span className="total-label">Blood report</span>
                            <span className="total-value">₹200</span>
                        </div>
                    </div>

                    {/* Grand Total */}
                    <div className="grand-total-section">
                        <div className="grand-total-row">
                            <span className="grand-total-label">TOTAL</span>
                            <span className="grand-total-value">₹200</span>
                        </div>
                    </div>

                    {/* Payment Method */}
                    <div className="payment-method-section">
                        <div className="payment-method-title">Payment Method</div>
                        <div className="payment-method-value">UPI Method</div>
                    </div>

                    {/* Footer with Contact Info */}
                    <div className="invoice-footer">
                        <div className="footer-molecules-left">
                            <svg width="200" height="100" viewBox="0 0 200 100">
                                <circle cx="40" cy="50" r="15" fill="#4A90E2" opacity="0.6" />
                                <circle cx="70" cy="40" r="12" fill="#5DADE2" opacity="0.6" />
                                <circle cx="90" cy="60" r="10" fill="#85C1E9" opacity="0.6" />
                                <circle cx="60" cy="70" r="13" fill="#3498DB" opacity="0.6" />
                                <circle cx="110" cy="50" r="11" fill="#5DADE2" opacity="0.6" />
                                <line x1="40" y1="50" x2="70" y2="40" stroke="#5DADE2" strokeWidth="2" opacity="0.5" />
                                <line x1="70" y1="40" x2="90" y2="60" stroke="#5DADE2" strokeWidth="2" opacity="0.5" />
                                <line x1="60" y1="70" x2="90" y2="60" stroke="#5DADE2" strokeWidth="2" opacity="0.5" />
                            </svg>
                        </div>

                        <div className="footer-contact-info">
                            <div className="contact-item">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="#1E88E5">
                                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                                </svg>
                                <span>+91 8485 222 333</span>
                            </div>
                            <div className="contact-item">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="#1E88E5">
                                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                                </svg>
                                <span>john@gmail.com</span>
                            </div>
                            <div className="contact-item">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="#1E88E5">
                                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                                </svg>
                                <span>golden city center , chhatrapati sambhajinager</span>
                            </div>
                        </div>

                        <div className="footer-pills-right">
                            <svg width="120" height="100" viewBox="0 0 120 100">
                                <ellipse cx="60" cy="40" rx="18" ry="25" fill="#E74C3C" opacity="0.7" transform="rotate(-30 60 40)" />
                                <ellipse cx="60" cy="40" rx="18" ry="25" fill="#FFFFFF" opacity="0.8" transform="rotate(-30 60 40)" />
                                <rect x="50" y="20" width="20" height="40" fill="#E74C3C" opacity="0.7" rx="10" transform="rotate(-30 60 40)" />

                                <ellipse cx="85" cy="50" rx="15" ry="22" fill="#F39C12" opacity="0.7" transform="rotate(20 85 50)" />
                                <ellipse cx="85" cy="50" rx="15" ry="22" fill="#FFFFFF" opacity="0.8" transform="rotate(20 85 50)" />
                                <rect x="77" y="30" width="16" height="40" fill="#F39C12" opacity="0.7" rx="8" transform="rotate(20 85 50)" />

                                <rect x="95" y="35" width="20" height="25" fill="#FFFFFF" rx="3" stroke="#E74C3C" strokeWidth="2" />
                                <path d="M 97 45 L 103 45 M 100 42 L 100 48" stroke="#E74C3C" strokeWidth="2" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="action-buttons">
                    <button className="action-btn print-btn">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                            <path d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z" />
                        </svg>
                        Print Invoice
                    </button>
                    <button className="action-btn download-btn">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                            <path d="M19 12v7H5v-7H3v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2zm-6 .67l2.59-2.58L17 11.5l-5 5-5-5 1.41-1.41L11 12.67V3h2z" />
                        </svg>
                        Download
                    </button>
                    <button className="action-btn share-btn">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                            <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" />
                        </svg>
                        Share
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InvoiceReceipt;
