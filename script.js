
document.addEventListener('DOMContentLoaded', function() {
    // Helper: safe get canvas context
    function getContextSafely(id) {
        const el = document.getElementById(id);
        if (!el) return null;
        try {
            return el.getContext('2d');
        } catch (e) {
            return null;
        }
    }

    // Initialize Scroll Animations
    const scrollElements = document.querySelectorAll('[data-scroll]');
    
    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    };
    
    const displayScrollElement = (element) => {
        element.classList.add('is-visible');
    };
    
    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.25)) {
                displayScrollElement(el);
            }
        });
    };
    
    // Initialize on load
    handleScrollAnimation();
    
    // Add scroll event listener
    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });

    // Detect page language (fallback to 'en')
    const pageLang = document.documentElement.lang === 'ar' ? 'ar' : 'en';

    // Language-aware labels and titles
    const labels = {
        en: {
            governorates: ["Sana'a", "Taiz", "Aden", "Ibb", "Hodeidah", "Dhamar"],
            targetTitle: 'Target Establishments Distribution by Governorate',
            demandTitle: 'Expected Demand by Governorate (First Year)',
            demandLabel: 'Expected Machines',
            priceLabels: ['Local', 'Imported (Before Customs)', 'Imported (After Customs)', 'Our Project'],
            priceTitle: 'Machine Price Comparison',
            costLabels: ['Mechanical Components', 'Electrical Components', 'Control System', 'Sensors & Motors'],
            costTitle: 'Fixed Costs Distribution',
            revenueLabels: ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'],
            revenueTitle: '5-Year Revenue Projections',
            revenueDatasetLabels: ['Conservative Scenario', 'Average Scenario']
        },
        ar: {
            governorates: ['صنعاء', 'تعز', 'عدن', 'إب', 'الحديدة', 'ذمار'],
            targetTitle: 'توزيع المنشآت المستهدفة حسب المحافظة',
            demandTitle: 'الطلب المتوقع حسب المحافظة (السنة الأولى)',
            demandLabel: 'الآلات المتوقعة',
            priceLabels: ['محلي', 'مستورد (قبل الجمارك)', 'مستورد (بعد الجمارك)', 'مشروعنا'],
            priceTitle: 'مقارنة أسعار الآلات',
            costLabels: ['المكونات الميكانيكية', 'المكونات الكهربائية', 'نظام التحكم', 'المستشعرات والمحركات'],
            costTitle: 'توزيع التكاليف الثابتة',
            revenueLabels: ['السنة 1', 'السنة 2', 'السنة 3', 'السنة 4', 'السنة 5'],
            revenueTitle: 'توقعات الإيرادات لمدة 5 سنوات',
            revenueDatasetLabels: ['السيناريو المتحفظ', 'السيناريو المتوسط']
        }
    };

    const L = pageLang === 'ar' ? labels.ar : labels.en;

    // --- Chart: targetChart (doughnut) ---
    const targetCtx = getContextSafely('targetChart');
    if (targetCtx) {
        new Chart(targetCtx, {
            type: 'doughnut',
            data: {
                labels: L.governorates.slice(),
                datasets: [{
                    data: [250, 180, 150, 70, 50, 40],
                    backgroundColor: [
                        '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'
                    ],
                    borderColor: '#111827',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: '#f0f0f0',
                            // if RTL, try to draw labels right-to-left by setting boxWidth etc.
                        }
                    },
                    title: {
                        display: true,
                        text: L.targetTitle,
                        color: '#f0f0f0'
                    }
                }
            }
        });
    }

    // --- Chart: demandChart (bar) ---
    const demandCtx = getContextSafely('demandChart');
    if (demandCtx) {
        new Chart(demandCtx, {
            type: 'bar',
            data: {
                labels: L.governorates.slice(),
                datasets: [{
                    label: L.demandLabel,
                    data: [5, 4, 3, 1, 1, 1],
                    backgroundColor: '#3B82F6',
                    borderColor: '#1E40AF',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1,
                            color: '#f0f0f0'
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        }
                    },
                    x: {
                        ticks: {
                            color: '#f0f0f0'
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        }
                    }
                },
                plugins: {
                    legend: {
                        labels: {
                            color: '#f0f0f0'
                        }
                    },
                    title: {
                        display: true,
                        text: L.demandTitle,
                        color: '#f0f0f0'
                    }
                }
            }
        });
    }

    // --- Chart: priceChart (bar) ---
    const priceCtx = getContextSafely('priceChart');
    if (priceCtx) {
        new Chart(priceCtx, {
            type: 'bar',
            data: {
                labels: L.priceLabels.slice(),
                datasets: [{
                    label: 'Price in USD',
                    data: [150, 16000, 22000, 6500],
                    backgroundColor: ['#FCD34D', '#F87171', '#EF4444', '#10B981'],
                    borderColor: ['#F59E0B', '#DC2626', '#B91C1C', '#059669'],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            color: '#f0f0f0'
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        }
                    },
                    x: {
                        ticks: {
                            color: '#f0f0f0'
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    title: {
                        display: true,
                        text: L.priceTitle,
                        color: '#f0f0f0'
                    }
                }
            }
        });
    }

    // --- Chart: costChart (pie) ---
    const costCtx = getContextSafely('costChart');
    if (costCtx) {
        new Chart(costCtx, {
            type: 'pie',
            data: {
                labels: L.costLabels.slice(),
                datasets: [{
                    data: [2000, 1500, 800, 700],
                    backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: '#f0f0f0'
                        }
                    },
                    title: {
                        display: true,
                        text: L.costTitle,
                        color: '#f0f0f0'
                    }
                }
            }
        });
    }

    // --- Chart: revenueChart (line) ---
    const revenueCtx = getContextSafely('revenueChart');
    if (revenueCtx) {
        new Chart(revenueCtx, {
            type: 'line',
            data: {
                labels: L.revenueLabels.slice(),
                datasets: [{
                    label: L.revenueDatasetLabels[0],
                    data: [65000, 78000, 91000, 104000, 117000],
                    borderColor: '#10B981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    tension: 0.1
                }, {
                    label: L.revenueDatasetLabels[1],
                    data: [97500, 120000, 142500, 165000, 187500],
                    borderColor: '#3B82F6',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    tension: 0.1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '$' + value.toLocaleString();
                            },
                            color: '#f0f0f0'
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        }
                    },
                    x: {
                        ticks: {
                            color: '#f0f0f0'
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        }
                    }
                },
                plugins: {
                    legend: {
                        labels: {
                            color: '#f0f0f0'
                        }
                    },
                    title: {
                        display: true,
                        text: L.revenueTitle,
                        color: '#f0f0f0'
                    }
                }
            }
        });
    }

    // Add floating animation to team members
    const teamMembers = document.querySelectorAll('.team-member');
    teamMembers.forEach((member, index) => {
        member.style.animation = `float 3s ease-in-out ${index * 0.2}s infinite`;
    });
});
