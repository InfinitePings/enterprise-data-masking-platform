package com.masking.datamasking.util;

import com.masking.datamasking.model.MaskingRule;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class RegexMaskingUtil {

    public static String mask(String value, MaskingRule rule) {

        if (value == null) return null;

        Pattern pattern = Pattern.compile(rule.getRegexPattern());
        Matcher matcher = pattern.matcher(value);

        if (!matcher.find()) return value;

        // EMAIL SPECIAL HANDLING
        if (value.contains("@")) {
            return maskEmail(value, rule.getMaskChar());
        }

        // DEFAULT MASKING
        switch (rule.getMaskType()) {

            case "FULL":
                return value.replaceAll(".", rule.getMaskChar());

            case "PARTIAL":
                int visible = 2;
                if (value.length() <= visible) return value;

                String masked = value.substring(0, visible)
                        + value.substring(visible).replaceAll(".", rule.getMaskChar());

                return masked;

            default:
                return value;
        }
    }

    // EMAIL MASKING METHOD
    private static String maskEmail(String email, String maskChar) {

        String[] parts = email.split("@");

        if (parts.length != 2) return email;

        String username = parts[0];
        String domain = parts[1];

        int visible = 2;

        if (username.length() <= visible) {
            return username + "@" + domain;
        }

        String maskedPart = username.substring(visible)
                .replaceAll(".", maskChar);

        return username.substring(0, visible) + maskedPart + "@" + domain;
    }
}