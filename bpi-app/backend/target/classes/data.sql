-- Seed FAQ data only if table is empty
INSERT INTO faq_items (question, answer, sort_order)
SELECT 'How do I register for BPI online?',
       'You can register through the BPI online banking website or the BPI app.',
       1
FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM faq_items WHERE sort_order = 1);

INSERT INTO faq_items (question, answer, sort_order)
SELECT 'Who can register for BPI online?',
       'BPI clients with an eligible deposit, credit card, or prepaid account can register.',
       2
FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM faq_items WHERE sort_order = 2);

INSERT INTO faq_items (question, answer, sort_order)
SELECT 'I''m not receiving a One-Time PIN (OTP) to finish registering. What should I do?',
       'Check that your registered mobile number is updated and has signal. Contact BPI through its official channels if you still need help.',
       3
FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM faq_items WHERE sort_order = 3);
